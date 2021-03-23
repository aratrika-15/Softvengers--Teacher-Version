import React from 'react'
import { withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import {useState,useEffect} from 'react'

const ViewLeaderboard = () => {
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor:'#6f7bd9',
     color: theme.palette.common.black,
      fontSize: 24,
      
    },
    body: {
      fontSize: 20,
      color: theme.palette.common.black,
    },
  }))(TableCell);
  const ColorTableContainer= withStyles((theme) => ({
    body:{
      backgroundColor: '#ffffff',
    }
  }))(TableContainer); 
  
  const columns = [
        { id: 'rank', label: 'Rank', minWidth: 100},
        { id: 'name', label: 'Student Name', minWidth: 170, type: 'link' },
        { id: 'totalScore', label: 'Total Score', minWidth: 100 }
        ]
  const [rows, setData] = useState([])

  const fetchStudents = async ()=> {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlNVMDAxQGUubnR1LmVkdS5zZyIsImlkIjoiNjA1MzE2Njk5ZDRhNjI0MmYwZDk5M2RmIiwidHV0R3AiOiJTQ0U0IiwiaWF0IjoxNjE2MDU4MTg2fQ.7LFzy-ecqB89ZNydkPR0LhuM33SV3ciaPJmO_g9oQnc");
    const res = await fetch('http://localhost:5000/teacher/leaderboard',{
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    })
    const data = await res.json()
    return data
  }
  

  useEffect(()=>{
    const getStudents = async()=>{
      const studentsFromServer = await fetchStudents()
      const allStudents = studentsFromServer.sort((a, b) => parseFloat(b.totalScore) - parseFloat(a.totalScore));
      setData(allStudents)

    }
    getStudents()
  },[setData])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };
  
    return (
        <div className ='table-container'>
          <h1 className ='LeaderBoard'>LeaderBoard</h1>
            <TableContainer >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>{columns.map((column)=>(
                        <StyledTableCell key = {column.id} align ={column.align} style={{minWidth: column.minWidth}} >{column.label}</StyledTableCell>))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = column.id === 'rank' ? `Rank ${index + page * rowsPerPage + 1} ` :row[column.id] ;
                    const rank1 = value[5] === '1'? `Rank 1 🥇` : value;
                    const rank2 = value[5] === '2'? `Rank 2 🥈` : rank1;
                    const rank3 = value[5] === '3'? `Rank 3 🥉` : rank2;
                    return (
                      <StyledTableCell key={column.id} align={column.align}>{rank3}</StyledTableCell>
                    );
                  })}
                </TableRow>
              );
            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
        rowsPerPageOptions={[5,10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
            
        </div>
    )
}

export default ViewLeaderboard
