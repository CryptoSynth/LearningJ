// POST /api/returns {customerID, movieId}

//NEGATIVE TEST CASES:
//return 401 if client is not logged in
//return 400 if customerId is not valid
//return 400 if movieId is not valid
//return 404 if no rental found for this customer && movie
//return 400 if rental already processed

//POSITIVE TEST CASES:
//return 200 if valid request
//set the return date
//calculate the rental fee

//increase stock
// return the rental
