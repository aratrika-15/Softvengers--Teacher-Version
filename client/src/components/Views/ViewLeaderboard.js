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

const ViewLeaderboard = ({students}) => {
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor:theme.palette.primary.main,
     color: theme.palette.common.black,
      fontSize: 24,
      
    },
    body: {
      fontSize: 20,
      color: theme.palette.common.black,
    },
  }))(TableCell);
  
  const columns = [
        { id: 'rank', label: 'Rank', minWidth: 100},
        { id: 'name', label: 'Student Name', minWidth: 170, type: 'link' },
        { id: 'score', label: 'Total Score', minWidth: 100 }
        ]
  const [rows, setData] = useState([])
  const stus = [
          {
              id:1,
              name: 'Saiteja',
              password: '123456',
              email: 'reddysaiteja5@gmail.com',
              score:25
          },
          {
            id:2,
            name: 'Reddy',
            password: '123456',
            email: 'reddysaiteja5@gmail.com',
            score:60
        },
        {
          id:3,
          name: 'teja',
          password: '123456',
          email: 'reddysaiteja5@gmail.com',
          score:50
      },
      {
        id:4,
        name: 'SSAD',
        password: '123456',
        email: 'reddysaiteja5@gmail.com',
        score:90
    },
    {
      id:5,
      name: 'SE',
      password: '123456',
      email: 'reddysaiteja5@gmail.com',
      score:10
  },
          {
              id:6,
              name: 'Kondreddy',
              password: '123456',
              email: 'reddysaiteja5@gmail.com',
              score:30
          }
      
      ]
      
      
    useEffect(() => {
      const allStudents = [...stus].sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
      setData(allStudents);
      }, [setData]);
       
        
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };
  
    return (
        <div className ='table-conatiner'>
          <h1 >LeaderBoard</h1>
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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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
        rowsPerPageOptions={[10, 25, 100]}
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
