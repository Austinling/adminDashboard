import { SignJWT, jwtVerify } from "jose";

type Env = {
  DB: D1Database; // Cloudflare D1 binding
  ADMIN_SECRET: string;
  JWT_SECRET: string;
}

type UserBody = {
  email: string;
  password: string;
}

type LoginBody = {
  email: string;
  password: string;
}

type StudentBody = {
  name: string;
  phoneNumber: string;
  grade: string;
}

type PaymentBody = {
  student_id: number;
  paid_for_period: string;
  amount: string;
  status: string;
  payment_date: string;
  student?: string;
}

export default {
  async fetch(request:Request, env:Env):Promise<Response> {

    const corsHeaders = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*"
    }

    if (request.method === "OPTIONS"){
      return new Response(null,{headers:corsHeaders});
    }


    try{
      const url = new URL(request.url);

      async function hashPassword(password:string):Promise<string>{
        const textEncoder = new TextEncoder();
        const data = textEncoder.encode(password);

        const hashCode = await crypto.subtle.digest("SHA-256",data);
        return Array.from(new Uint8Array(hashCode)).map((b) => b.toString(16).padStart(2,"0")).join("");
      }

	  async function createJWTToken(username: string, env: Env):Promise<string>{ 
		const encodedToken = new TextEncoder().encode(env.JWT_SECRET); 
		
		return await new SignJWT({username}) 
		.setProtectedHeader({alg: "HS256"}) 
		.setExpirationTime("2h") 
		.sign(encodedToken); }

        //POST for Creating accounts

        if (url.pathname == "/admin/create_user" && request.method === "POST"){

          if (request.headers.get("Authorization") != `Bearer ${env.ADMIN_SECRET}`){
            return new Response("Unauthorized", {status:401});
          }

          const body:UserBody = await request.json();
          const {email,password} = body;

          if (!email || !password) {
            return new Response("Missing fields", { status: 400 });
          }

          const password_hash = await hashPassword(password);
  
          await env.DB
          .prepare(`INSERT INTO users (email, password_hash)
              VALUES (?,?)`)
          .bind(email,password_hash)
          .run()
  
          return new Response(JSON.stringify({
            success: true,
            headers:corsHeaders
          }));
        }

      //POST for Login

      if (url.pathname == "/login" && request.method === "POST"){

        const body:LoginBody = await request.json();
        const {email,password} = body;

        const password_hash = await hashPassword(password)

        const loginResult= await env.DB

        .prepare(`SELECT * FROM users WHERE email = ? AND password_hash = ?`)
        .bind(email,password_hash)
        .all();

		const token = await createJWTToken(email,env)

        if (loginResult.results.length === 0){
          return new Response(JSON.stringify({
			password_hash:password_hash,
            success: false,
            message: "Login Unsuccesful"
          }),{headers:corsHeaders});
        }

		return new Response(JSON.stringify({
			token: token,
            success: true,
            message: "Login Succesful"
          }),{headers:corsHeaders});


      }


      //GET FOR STUDENTS

      if (url.pathname == "/students" && request.method === "GET"){
        const result = await env.DB
        .prepare("SELECT * FROM students")
        .all();

        return new Response(JSON.stringify(result.results), {
          headers: corsHeaders
        });
      }
        
      //POST for STUDENTS

      if (url.pathname == "/students" && request.method === "POST"){
        const body:StudentBody = await request.json();
        const {name,phoneNumber,grade} = body;

        const postResult= await env.DB

        .prepare(`INSERT INTO students (name,phoneNumber,grade)
        VALUES (?,?,?)`)
        .bind(name,phoneNumber,grade)
        .run()

        return new Response(JSON.stringify({
          success: true,
          student_id: postResult.meta.last_row_id}),
          {headers: corsHeaders}
        );
      }

      //GET FOR ATTENDANCE

      if (url.pathname == "/attendance" && request.method === "GET"){
        const result = await env.DB
        .prepare("SELECT * FROM attendance")
        .all();

        return new Response(JSON.stringify(result.results), {
          headers: corsHeaders
        });
      }

      //GET FOR PAYMENTS

      if (url.pathname == "/payments" && request.method === "GET"){
        const result = await env.DB
        .prepare("SELECT * FROM payments")
        .all();

        return new Response(JSON.stringify(result.results), {
          headers: corsHeaders
        });
      }

              
      //POST for PAYMENTS

      if (url.pathname == "/payments" && request.method === "POST"){
        const body:PaymentBody = await request.json();
        const {student_id,paid_for_period,amount,status,payment_date,student} = body;

        const postResult= await env.DB

        .prepare(`INSERT INTO payments (student_id,paid_for_period,amount,status,payment_date,student)
        VALUES (?,?,?,?,?,?)`)
        .bind(student_id,paid_for_period,amount,status,payment_date,student)
        .run()

        return new Response(JSON.stringify({
          success: true,
          payment_id: postResult.meta.last_row_id}),
          {headers: corsHeaders}
        );
      }

      return new Response("Not Found", { status: 404, headers: corsHeaders});

    }catch (error: any){
      return new Response(
        JSON.stringify({ error: error.message}),
        { status: 500, headers:corsHeaders}
      );
    }
  }
}