import search from "./assets/images/search.png";

type searchBarType = {
  searchName: string;
  searchingChange: (value: string) => void;
};

export function SearchBar({ searchName, searchingChange }: searchBarType) {
  return (
    <>
      <div className="">
        <div className="relative bg-gray-100 rounded-4xl w-50 focus-within:ring-2 focus-within:ring-black">
          <input
            type="text"
            className="flex-1 focus:outline-none bg-transparent px-10 py-3"
            value={searchName}
            onChange={(e) => searchingChange(e.target.value)}
            placeholder="Search..."
          ></input>
          <button className="absolute top-1/2 -translate-y-1/2 px-3">
            <img src={search} alt="searchIcon" className="w-5"></img>
          </button>
        </div>
      </div>
    </>
  );
}
