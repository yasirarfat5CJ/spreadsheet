import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge.jsx'

function StatusBadge({ status }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'In-process':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Need to start':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Complete':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'Blocked':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <Badge variant="outline" className={`${getStatusColor(status)} text-xs px-2 py-1`}>
      {status}
    </Badge>
  )
}

function PriorityBadge({ priority }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-red-600 font-medium'
      case 'Medium':
        return 'text-orange-600 font-medium'
      case 'Low':
        return 'text-blue-600 font-medium'
      default:
        return 'text-gray-600 font-medium'
    }
  }

  return (
    <span className={`${getPriorityColor(priority)} text-sm`}>
      {priority}
    </span>
  )
}

export default function SpreadsheetTable({ data, searchTerm }) {
  const [selectedCell, setSelectedCell] = useState(null)
  const [selectedRow, setSelectedRow] = useState(null)

  const filteredData = data.filter(row =>
    Object.values(row).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const handleCellClick = (rowId, columnKey) => {
    setSelectedCell({ rowId, columnKey })
  }

  const handleRowClick = (rowId) => {
    setSelectedRow(rowId)
  }

  const handleKeyDown = (e) => {
    if (!selectedCell) return

    const { rowId, columnKey } = selectedCell
    const columns = ['id', 'jobRequest', 'submitted', 'status', 'submitter', 'url', 'assigned', 'priority', 'dueDate', 'estValue', '+']
    const currentRowIndex = filteredData.findIndex(row => row.id === rowId)
    const currentColumnIndex = columns.indexOf(columnKey)

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        if (currentRowIndex > 0) {
          const newRowId = filteredData[currentRowIndex - 1].id
          setSelectedCell({ rowId: newRowId, columnKey })
        }
        break
      case 'ArrowDown':
        e.preventDefault()
        if (currentRowIndex < filteredData.length - 1) {
          const newRowId = filteredData[currentRowIndex + 1].id
          setSelectedCell({ rowId: newRowId, columnKey })
        }
        break
      case 'ArrowLeft':
        e.preventDefault()
        if (currentColumnIndex > 0) {
          const newColumnKey = columns[currentColumnIndex - 1]
          setSelectedCell({ rowId, columnKey: newColumnKey })
        }
        break
      case 'ArrowRight':
        e.preventDefault()
        if (currentColumnIndex < columns.length - 1) {
          const newColumnKey = columns[currentColumnIndex + 1]
          setSelectedCell({ rowId, columnKey: newColumnKey })
        }
        break
      case 'Enter':
        e.preventDefault()
        break
      case 'Escape':
        e.preventDefault()
        setSelectedCell(null)
        setSelectedRow(null)
        break
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedCell, filteredData])

  const getCellClassName = (rowId, columnKey) => {
    const isSelected = selectedCell?.rowId === rowId && selectedCell?.columnKey === columnKey
    const isRowSelected = selectedRow === rowId

    let baseClass = "px-6 py-4 whitespace-nowrap text-sm cursor-pointer border border-gray-200"

    if (isSelected) {
      baseClass += " bg-blue-100 border-blue-500 ring-1 ring-blue-500"
    } else if (isRowSelected) {
      baseClass += " bg-blue-50"
    } else {
      baseClass += " hover:bg-gray-50"
    }

    return baseClass
  }

  return (
    <div className="w-full overflow-x-auto" tabIndex={0}>
      <table className="min-w-[1000px] w-full table-auto border-collapse">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">#</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-64">Job Request</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitter</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Value</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">+</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredData.map((row) => (
            <tr
              key={row.id}
              className={`${selectedRow === row.id ? 'bg-blue-50' : 'hover:bg-gray-50'} cursor-pointer`}
              onClick={() => handleRowClick(row.id)}
            >
              <td className={getCellClassName(row.id, 'id')} onClick={(e) => { e.stopPropagation(); handleCellClick(row.id, 'id') }}>{row.id}</td>
              <td className={`${getCellClassName(row.id, 'jobRequest')} max-w-64`} onClick={(e) => { e.stopPropagation(); handleCellClick(row.id, 'jobRequest') }}>
                <div className="truncate">{row.jobRequest}</div>
              </td>
              <td className={getCellClassName(row.id, 'submitted')} onClick={(e) => { e.stopPropagation(); handleCellClick(row.id, 'submitted') }}>{row.submitted}</td>
              <td className={getCellClassName(row.id, 'status')} onClick={(e) => { e.stopPropagation(); handleCellClick(row.id, 'status') }}>
                <StatusBadge status={row.status} />
              </td>
              <td className={getCellClassName(row.id, 'submitter')} onClick={(e) => { e.stopPropagation(); handleCellClick(row.id, 'submitter') }}>{row.submitter}</td>
              <td className={`${getCellClassName(row.id, 'url')} text-blue-600 hover:text-blue-800`} onClick={(e) => { e.stopPropagation(); handleCellClick(row.id, 'url') }}>{row.url}</td>
              <td className={getCellClassName(row.id, 'assigned')} onClick={(e) => { e.stopPropagation(); handleCellClick(row.id, 'assigned') }}>{row.assigned}</td>
              <td className={getCellClassName(row.id, 'priority')} onClick={(e) => { e.stopPropagation(); handleCellClick(row.id, 'priority') }}>
                <PriorityBadge priority={row.priority} />
              </td>
              <td className={getCellClassName(row.id, 'dueDate')} onClick={(e) => { e.stopPropagation(); handleCellClick(row.id, 'dueDate') }}>{row.dueDate}</td>
              <td className={`${getCellClassName(row.id, 'estValue')} font-medium`} onClick={(e) => { e.stopPropagation(); handleCellClick(row.id, 'estValue') }}>{row.estValue}</td>
              <td className={getCellClassName(row.id, '+')}></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
