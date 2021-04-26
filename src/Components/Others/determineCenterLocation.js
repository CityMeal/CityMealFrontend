function determineCenter(locations) {
    if (locations.data.length < 2) {
      return   {lat:locations.data[0].latitude,lng:locations.data[0].longitude}
    } else {
        let mid = Math.round(locations.data.length / 2)
        return {lat:locations.data[mid].latitude,lng:locations.data[mid].longitude}
    };
};

export {determineCenter};