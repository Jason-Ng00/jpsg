import React, { useState } from "react"
import Pagination from "../Pagination/Pagination.js"
import "./EventList.scss"

let PageSize = 10

const EventList = props => {
  const attribute = props.attribute
  const data = props.data

  const [currentPage, setCurrentPage] = useState(1)

  const firstPageIndex = (currentPage - 1) * PageSize
  const lastPageIndex = firstPageIndex + PageSize
  const currentTableData = data.slice(firstPageIndex, lastPageIndex)

  return (
    <>
      <table>
        <thead>
          <tr>
            {attribute.map(attr => (
              <td>{attr}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentTableData.map(item => {
            return (
              <tr>
                {attribute.map(attr => (
                  <td>{item[attr]}</td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </>
  )
}

export default EventList
