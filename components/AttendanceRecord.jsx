import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

const AttendanceRecord = ({ subject }) => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const q = query(
          collection(db, 'attendance'),
          where('subject', '==', subject)
        );
        const querySnapshot = await getDocs(q);
        const data = [];
        
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        
        // Sort by date
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setAttendanceData(data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendanceData();
  }, [subject]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 2 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Student Name</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendanceData.map((record) => (
            record.students.map((student, index) => (
              <TableRow key={`${record.id}-${index}`}>
                <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>
                  <span style={{ 
                    color: student.status === 'present' ? 'green' : 'red',
                    fontWeight: 'bold'
                  }}>
                    {student.status.toUpperCase()}
                  </span>
                </TableCell>
              </TableRow>
            ))
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default AttendanceRecord;