const mth40 = {
    config : {
        PORT : process.env.REACT_APP_MTH40_API_PORT || null,
        DB_HOST : process.env.REACT_APP_MTH40_API_HOST || 'http://localhost',
        API_MTH40_URL : ((process.env.REACT_APP_MTH40_API_HOST || 'http://localhost') +  ((process.env.REACT_APP_MTH40_API_PORT || null) ? ":" + (process.env.REACT_APP_MTH40_API_PORT || null) : ""))
    },    
}

module.exports = mth40;