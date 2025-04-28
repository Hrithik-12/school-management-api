const db = require('../db'); // Adjust the path to your db module
 const addSchool=(req, res) => {
    const { name, address, latitude, longitude } = req.body;
  
    // Basic Validation
    if (!name || !address || !latitude || !longitude) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    // validations check
    if(typeof name!=='string' || typeof address!=='string'){
      return res.status(400).json({ message: 'Name and address must be strings.' });
    }
    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ message: 'Latitude and longitude must be numbers.' });
    }
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      return res.status(400).json({ message: 'Latitude must be between -90 and 90, and longitude must be between -180 and 180.' });
    }
  
    const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, address, latitude, longitude], (err, result) => {
      if (err) {
        console.error('Error inserting school:', err);
        return res.status(500).json({ message: 'Database error' });
      }
      res.status(201).json({ message: result.affectedRows > 0 ? 'School added successfully' : 'Failed to add school' });
    });
  };


 const listSchools=(req, res) => {
    const { latitude, longitude } = req.query;
  
    if (!latitude || !longitude) {
      return res.status(400).json({ message: 'Latitude and longitude are required.' });
    }
  
    const userLat = parseFloat(latitude);
    const userLng = parseFloat(longitude);
  
    if(isNaN(userLat) || isNaN(userLng)) {
      return res.status(400).json({ message: 'Latitude and longitude must be numbers.' });
    }
    if (userLat < -90 || userLat > 90 || userLng < -180 || userLng > 180) {
      return res.status(400).json({ message: 'Latitude must be between -90 and 90, and longitude must be between -180 and 180.' });
    }
  
    db.query('SELECT * FROM schools', (err, results) => {
      if (err) {
        console.error('Error fetching schools:', err);
        return res.status(500).json({ message: 'Database error' });
      }
  
      // Calculate distance using Haversine formula
      const schoolsWithDistance = results.map(school => {
        const R = 6371; // Radius of the Earth in km
        const dLat = (school.latitude - userLat) * (Math.PI / 180);
        const dLng = (school.longitude - userLng) * (Math.PI / 180);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(userLat * (Math.PI / 180)) * Math.cos(school.latitude * (Math.PI / 180)) *
          Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return { ...school, distance };
      });
  
      // Sort by distance
      schoolsWithDistance.sort((a, b) => a.distance - b.distance);
  
      res.json(schoolsWithDistance);
    });
  };
  module.exports = { addSchool, listSchools };
