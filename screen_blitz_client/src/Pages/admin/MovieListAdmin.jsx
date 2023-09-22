import React, { useState, useEffect } from 'react';
import { AdminNavbar } from '../../Components/admin/navbar/AdminNavbar';
import { AdminSideBar } from '../../Components/admin/adminSidebar/AdminSidebar';
import { movieFetch } from '../../api/adminApi';
import { MovieListTable } from '../../Components/admin/simpletable/MovieListTable';

function MovieListAdmin() {
  const [movieDetails, setMovieDetails] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await movieFetch();
      
      return response;
    }

    fetchData().then(data => {
      setMovieDetails(data?.movieData);
    });
  }, []);



  return (
    <div>
      <AdminNavbar />
      <AdminSideBar />
      <div className='ms-[20rem] bg-blue-gray-900 w-[calc(100vw-20rem)] h-[calc(100vh-56px)]'>
        <MovieListTable data={movieDetails} />
      </div>
    </div>
  );
}

export default MovieListAdmin;
