import React, { Component, Fragment } from 'react'
 
export default class OneMovie extends Component {
    state = { movie: {}, isLoaded: false, error: null }
 
    componentDidMount() {
        fetch("http://localhost:8080/v1/movies/" + this.props.match.params.id, {mode:'cors'})
            .then((response) => {
                if (response.status !== "200") {
                    let err = Error
                    err.message = "invalid response code: " + response.status
                    this.setState({ error: err })
                }
                return response.json()
            })
            .then((json) => {
                this.setState({
                    movie: json.movie,
                    isLoaded: true,
                }, (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                })
            })
    }
 
    render() {
        const { movie, isLoaded, error } = this.state
        // console.log("isLoaded" + isLoaded)
        // console.log("Movie: " + movie)
        // console.log("Error:" + error)
        if (movie.genres) {
            // convert to array
            movie.genres = Object.values(movie.genres)
        } else {
            movie.genres = []
        }
        if (error) {
            return <div>error: {error.message}</div>
        } else if (!isLoaded) {
            return <p>loading...</p>
        } else {
            return (
                <Fragment>
                    <h2>Movie: {movie.title} ({movie.year})</h2>
                    <div className='float-start'>
                        <small>rating: {movie.mpaa_rating}</small>
                    </div>
                    <div className='float-end'>
                        {movie.genres.map((m, index) => (
                            <span className="badge bg-secondary me-1" key={index}>
                                {m}
                            </span>
                        ))}
                    </div>
                    <div className="clearfix"></div>
                    <hr />
                    <table className="table table-compact table-striped">
                        <thead></thead>
                        <tbody>
                            <tr>
                                <td><strong>title:</strong></td>
                                <td>{movie.title}</td>
                            </tr>
                            <tr>
                                <td><strong>description:</strong></td>
                                <td>{movie.description}</td>
                            </tr>
                            <tr>
                                <td><strong>run time:</strong></td>
                                <td>{movie.runtime} minutes</td>
                            </tr>
                        </tbody>
                    </table>
                </Fragment >
            )
        }
    }
}
