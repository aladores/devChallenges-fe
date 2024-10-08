import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/worldRanks/Pagination";
import useCountryData from "../../hooks/worldRanks/useCountryData";
import searchSvg from "../../assets/worldRanks/Search.svg";
import MainLayout from "../../layouts/worldRanks/MainLayout";
import CountryTableSkeleton from "./Skeletons/CountryTableSkeleton";
import "./CountryTable.css";

const PageSize = 20;
function CountryTable() {
  const {
    tableData,
    sortFilter,
    setSortFilter,
    regionFilter,
    setRegionFilter,
    statusFilter,
    setStatusFilter,
    countryResult,
    searchBar,
    setSearchBar,
  } = useCountryData();
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedTableData = useMemo(() => {
    if (tableData) {
      const totalPages = Math.ceil(tableData.length / PageSize);
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;

      if (totalPages !== 0) {
        if (totalPages <= currentPage) {
          setCurrentPage(totalPages);
        }
      }

      return tableData.slice(firstPageIndex, lastPageIndex);
    }
  }, [currentPage, tableData]);

  return (
    <MainLayout>
      <div className="wr__country-list-top-row">
        <div className="wr__country-length">
          Found {countryResult.isSuccess ? (tableData || []).length : 0}{" "}
          countries
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault;
          }}
        >
          <div className="wr__search-row">
            <img src={searchSvg} />
            <input
              type="text"
              id="wr__search-input"
              placeholder="Search by Name, Region"
              className="wr__search-input"
              value={searchBar}
              onChange={(event) => {
                setSearchBar(event.target.value);
              }}
            />
          </div>
        </form>
      </div>
      <div className="wr__main-content-container">
        <form className="wr__filter-container">
          <div className="wr__filter">
            <label htmlFor="wr_sort" className="wr__filter-label">
              Sort by
            </label>
            <select
              name="wr_sort"
              id="wr_sort"
              className="wr__sort-input"
              value={sortFilter}
              onChange={(event) => {
                setSortFilter(event.target.value);
              }}
            >
              <option value="Population">Population</option>
              <option value="Name">Name</option>
            </select>
          </div>
          <div className="wr__filter">
            <legend htmlFor="wr__region" className="wr__filter-label">
              Region
            </legend>
            <div className="wr__region-container">
              {Object.entries(regionFilter).map(([key, value]) => {
                return (
                  <div key={key}>
                    <input
                      type="checkbox"
                      id={key}
                      name={key}
                      onChange={(event) => {
                        const { name, checked } = event.target;
                        setRegionFilter((prevState) => ({
                          ...prevState,
                          [name]: checked,
                        }));
                      }}
                      checked={value}
                      className="wr__region-checkbox"
                    />
                    <label htmlFor={key} className="wr__region-label">
                      {key}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="wr__filter">
            <legend htmlFor="wr__region" className="wr__filter-label">
              Status
            </legend>
            <div className="wr__status-radio-container">
              <input
                type="radio"
                id="UN"
                name="Status"
                value="UN"
                checked={statusFilter ? "checked" : ""}
                onChange={() => {
                  setStatusFilter(true);
                }}
                className="wr__status-radio"
              />
              <label htmlFor="UN" className="wr__status-label">
                <span
                  className={`wr__status-checkbox ${
                    statusFilter ? "checked" : ""
                  }`}
                ></span>
                Member of the United Nations
              </label>
            </div>

            <div className="wr__status-radio-container">
              <input
                type="radio"
                id="Independent"
                name="Status"
                value="Independent"
                checked={statusFilter ? "" : "checked"}
                onChange={() => {
                  setStatusFilter(false);
                }}
                className="wr__status-radio"
              />
              <label htmlFor="Independent" className="wr__status-label">
                <span
                  className={`wr__status-checkbox ${
                    statusFilter ? "" : "checked"
                  }`}
                ></span>
                Independent
              </label>
            </div>
          </div>
        </form>
        <div className="wr__table-container">
          {countryResult.isError ||
            (!tableData && <div>Error displaying table data</div>)}
          {countryResult.isLoading && <CountryTableSkeleton />}
          {/* {countryResult.isSuccess && <CountryTableSkeleton />} */}
          {countryResult.isSuccess && (
            <div>
              <table className="wr__table">
                <thead className="wr__table-head">
                  <tr className="wr__table-header-row">
                    <th className="wr__filter-label" scope="col">
                      Flag
                    </th>
                    <th className="wr__filter-label" scope="col">
                      Name
                    </th>
                    <th className="wr__filter-label" scope="col">
                      Population
                    </th>
                    <th className="wr__filter-label" scope="col">
                      Area (km<sup>2</sup>)
                    </th>
                    <th className="wr__filter-label" scope="col">
                      Region
                    </th>
                  </tr>
                </thead>
                <tbody className="wr__table-body">
                  {paginatedTableData &&
                    paginatedTableData.map((item) => {
                      return (
                        <tr key={item.name.common} className="wr__table-data">
                          <td className="wr__table-flag">{item.flag}</td>
                          <td>
                            <Link
                              to={`/country/${item.name.common}`}
                              className="wr__table-name-link"
                            >
                              {item.name.common.length > 25
                                ? `${item.name.common.slice(0, 25)}...`
                                : item.name.common}
                            </Link>
                          </td>
                          <td>{item.population.toLocaleString()}</td>
                          <td>{item.area.toLocaleString()}</td>
                          <td>{item.region}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              {tableData && tableData.length === 0 ? (
                <p className="wr__table-error">
                  No countries available with the filter(s) selected.
                </p>
              ) : null}
              {tableData && (
                <Pagination
                  currentPage={currentPage}
                  totalCount={tableData.length}
                  pageSize={PageSize}
                  handlePageChange={(page) => setCurrentPage(page)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default CountryTable;
