import React, { useEffect, useState } from 'react';
import { db } from './firebase'; // Import your firebase config here
import { collection, getDocs, query, where } from 'firebase/firestore';

function DailyPostDetails() {
  const [data, setData] = useState([]);
  const [totals, setTotals] = useState({
    speedCount: 0,
    speedPrice: 0,
    normalCount: 0,
    normalPrice: 0,
    thabalCount: 0,
    thabalPrice: 0,
    totalPrice: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchDailyPosts = async () => {
        try {
          setIsLoading(true);
          let queryRef = collection(db, 'posts');
    
          if (startDate) queryRef = query(queryRef, where('date', '>=', startDate));
          if (endDate) queryRef = query(queryRef, where('date', '<=', endDate));
    
          const snapshot = await getDocs(queryRef);
          const posts = snapshot.docs.map(doc => doc.data());
    
          // Group the posts by date and branch
          const groupedData = posts.reduce((acc, post) => {
            const key = `${post.date}-${post.branch}`;
            if (!acc[key]) {
              acc[key] = {
                date: post.date,
                branch: post.branch,
                speedCount: 0,
                speedPrice: 0,
                normalCount: 0,
                normalPrice: 0,
                thabalCount: 0,
                thabalPrice: 0,
                totalPrice: 0,
              };
            }
    
            // Parse string numbers to integers where applicable
            const speedCount = parseInt(post.speed, 10) || 0;
            const normalCount = parseInt(post.normal, 10) || 0;
            const thabalCount = parseInt(post.thabal, 10) || 0;
    
            acc[key].speedCount += speedCount;
            acc[key].speedPrice += post.SpeedResult || 0;
            acc[key].normalCount += normalCount;
            acc[key].normalPrice += post.NormalResult || 0;
            acc[key].thabalCount += thabalCount;
            acc[key].thabalPrice += post.ThabalResult || 0;
            acc[key].totalPrice += (post.SpeedResult || 0) + (post.NormalResult || 0) + (post.ThabalResult || 0);
    
            return acc;
          }, {});
    
          setData(Object.values(groupedData));
    
          // Calculate grand totals
          const grandTotals = Object.values(groupedData).reduce((acc, post) => {
            acc.speedCount += post.speedCount;
            acc.speedPrice += post.speedPrice;
            acc.normalCount += post.normalCount;
            acc.normalPrice += post.normalPrice;
            acc.thabalCount += post.thabalCount;
            acc.thabalPrice += post.thabalPrice;
            acc.totalPrice += post.totalPrice;
            return acc;
          }, {
            speedCount: 0,
            speedPrice: 0,
            normalCount: 0,
            normalPrice: 0,
            thabalCount: 0,
            thabalPrice: 0,
            totalPrice: 0,
          });
    
          setTotals(grandTotals);
        } catch (error) {
          console.error('Error fetching daily posts:', error);
        } finally {
          setIsLoading(false);
        }
      };
    fetchDailyPosts();
  }, [startDate, endDate]); // refetch data when startDate or endDate change

  return (
    <div>
      <h1>Daily Post Details</h1>

      {/* Date Range Inputs */}
      <div className='filter-container'>
        <div className='filter-start'>
          <label>Start Date: </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className='filter-end'>
          <label>End Date: </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <button onClick={fetchDailyPosts}>Filter</button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Date</th>
              <th>Branch</th>
              <th>Speed Post (Count & Price)</th>
              <th>Normal Post (Count & Price)</th>
              <th>Thabal Post (Count & Price)</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.date}</td>
                <td>{row.branch}</td>
                <td className='speed-post'>
                  {row.speedCount} (₹{row.speedPrice})
                </td>
                <td className='normal-post'>
                  {row.normalCount} (₹{row.normalPrice})
                </td>
                <td className='thabal-post'>
                  {row.thabalCount} (₹{row.thabalPrice})
                </td>
                <td>₹{row.totalPrice}</td>
              </tr>
            ))}
            <tr className='grand-totals'>
              <td colSpan="2" style={{ fontWeight: 'bold' }}>
                Grand Totals
              </td>
              <td>
                {totals.speedCount} (₹{totals.speedPrice})
              </td>
              <td>
                {totals.normalCount} (₹{totals.normalPrice})
              </td>
              <td>
                {totals.thabalCount} (₹{totals.thabalPrice})
              </td>
              <td>₹{totals.totalPrice}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DailyPostDetails;
