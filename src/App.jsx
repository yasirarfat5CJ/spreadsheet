import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import SpreadsheetTable from './components/SpreadsheetTable.jsx'
import {
  Search,
  Download,
  Upload,
  Share,
  Plus,
  Eye,
  Filter,
  ArrowUpDown,
  ChevronRight
} from 'lucide-react'
import './App.css'

const sampleData = [
  {
    id: 1,
    jobRequest: "Launch social media campaign for product launch",
    submitted: "15-11-2024",
    status: "In-process",
    submitter: "Aisha Patel",
    url: "www.aishapatel...",
    assigned: "Sophie Choudhury",
    priority: "Medium",
    dueDate: "20-11-2024",
    estValue: "6,200,000 ₹"
  },
  {
    id: 2,
    jobRequest: "Update press kit for company redesign",
    submitted: "05-12-2024",
    status: "Need to start",
    submitter: "Irfan Khan",
    url: "www.irfankhan...",
    assigned: "Tejas Pandey",
    priority: "High",
    dueDate: "30-10-2024",
    estValue: "3,500,000 ₹"
  },
  {
    id: 3,
    jobRequest: "Finalize user testing feedback for app...",
    submitted: "05-12-2024",
    status: "In-process",
    submitter: "Mark Johnson",
    url: "www.markjohns...",
    assigned: "Rachel Lee",
    priority: "Medium",
    dueDate: "10-12-2024",
    estValue: "4,750,000 ₹"
  },
  {
    id: 4,
    jobRequest: "Design new features for the website",
    submitted: "10-01-2025",
    status: "Complete",
    submitter: "Emily Green",
    url: "www.emilygreen...",
    assigned: "Tom Wright",
    priority: "Low",
    dueDate: "15-01-2025",
    estValue: "5,800,000 ₹"
  },
  {
    id: 5,
    jobRequest: "Prepare financial report for Q4",
    submitted: "25-01-2025",
    status: "Blocked",
    submitter: "Jessica Brown",
    url: "www.jessicabro...",
    assigned: "Kevin Smith",
    priority: "Low",
    dueDate: "30-01-2025",
    estValue: "2,800,000 ₹"
  }
]

function App() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleButtonClick = (action) => {
    console.log(`${action} button clicked`)
  }

  return (
    <div className="min-h-screen bg-white w-full overflow-x-auto">
      <div className="min-w-[1024px]">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-600 space-x-2">
              <span>Workspace</span>
              <ChevronRight className="w-4 h-4" />
              <span>Folder 2</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium">Spreadsheet 3</span>
            </div>

            {/* Search + Icons */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search within sheet"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <button className="relative">
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full text-xs text-white text-center">2</span>
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C8.67 6.165 8 7.388 8 8.75v5.408c0 .379-.214.725-.553.895L6 17h5m4 0v1a3 3 0 11-6 0v-1h6z" />
                </svg>
              </button>
              <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="User" className="w-8 h-8 rounded-full border" />
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="px-4 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col md:flex-row justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3 flex-wrap">
              <Button variant="ghost" size="sm">Tool bar</Button>
              <Button variant="ghost" size="sm"><Eye className="w-4 h-4 mr-2" /> Hide fields</Button>
              <Button variant="ghost" size="sm"><ArrowUpDown className="w-4 h-4 mr-2" /> Sort</Button>
              <Button variant="ghost" size="sm"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
              <Button variant="ghost" size="sm">Cell view</Button>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Button variant="outline" size="sm"><Upload className="w-4 h-4 mr-2" /> Import</Button>
              <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2" /> Export</Button>
              <Button variant="outline" size="sm"><Share className="w-4 h-4 mr-2" /> Share</Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white" size="sm"><Plus className="w-4 h-4 mr-2" /> New Action</Button>
            </div>
          </div>
        </div>

        {/* Mini Labels - Correctly aligned */}
        <div className="px-4 py-3 border-b border-gray-200 overflow-x-auto">
          <div className="min-w-[1024px] grid grid-cols-[50px_280px_120px_120px_140px_160px_140px_140px_140px] items-center gap-2 text-sm font-medium text-gray-800">
            {/* Q3 Financial Overview aligned to first 5 cols */}
            <div className="col-span-5 flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-900">Q3 Financial Overview</span>
            </div>
            {/* ABC over assigned */}
            <div className="text-center bg-green-100 px-2 py-1 rounded">ABC</div>
            {/* Answer a question over priority + due date */}
            <div className="col-span-2 text-center bg-purple-100 px-2 py-1 rounded">Answer a question</div>
            {/* Extract over est value */}
            <div className="text-center bg-red-100 px-2 py-1 rounded">Extract</div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <SpreadsheetTable data={sampleData} searchTerm={searchTerm} />
        </div>
      </div>
    </div>
  )
}

export default App
