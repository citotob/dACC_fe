const fetchFakeData = centerCoordinates => {
    const newFeaturesList = [];
    for (let i = 0; i < 20; i++) {
      const id = i;
      const { longitude, latitude } = { longitude: 97.318123, latitude: 5.05170 };
      newFeaturesList.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
        properties: {
          id,
          name: `Random Point #${id}`,
          description: `description for Random Point #${id}`,
        },
      });
    }
  
    return Promise.resolve({
      type: 'FeatureCollection',
      features: newFeaturesList,
    });
  };
  
  export default fetchFakeData;