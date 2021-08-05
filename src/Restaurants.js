import { useEffect, useState } from "react";
import queryString from 'query-string';
import { Card, Pagination, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Restaurants = props => {
    const [restaurants, setRestaurants] = useState(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    let history = useHistory();

    const { borough } = queryString.parse(props.query);
    useEffect(() => {
        setLoading(true);
        fetch(`https://morning-crag-64182.herokuapp.com/api/restaurants?page=${page}&perPage=10${borough ? `&borough=${borough}` : ''}`)
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                data.length ? setRestaurants(data) : setRestaurants(null);
            })
    }, [page, borough]);
    const previousPage = e => {
        if (page > 1)
            setPage(prevPage => prevPage - 1);
    }
    const nextPage = e => { setPage(prevPage => prevPage + 1) }

    if (!loading) {
        if (restaurants) {
            return (
                <div>
                    <Card bg="light">
                        <Card.Body>
                            <Card.Title>Restaurant List</Card.Title>
                            <Card.Text >Full list of restaurants. Optionally sorted by borough</Card.Text>
                        </Card.Body>
                    </Card>
                    <br />
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Borough</th>
                                <th>Cuisine</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                restaurants.map(restaurant => (
                                    <tr key={restaurant._id} onClick={e => { history.push(`/restaurant/${restaurant._id}`) }}>
                                        <td>{restaurant.name}</td>
                                        <td>{restaurant.address.building} {restaurant.address.street}</td>
                                        <td>{restaurant.borough}</td>
                                        <td>{restaurant.cuisine}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                    <br />
                    <Pagination>
                        <Pagination.Prev onClick={previousPage} />
                        <Pagination.Item>{page}</Pagination.Item>
                        <Pagination.Next onClick={nextPage} />
                    </Pagination>
                </div>
            )
        } else {
            return (
                <div>
                    <Card>
                        <Card.Body>
                            <Card.Text>No Restaurants Found</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            )
        }
    } else {
        return (
            <div>
                <Card bg="light">
                    <Card.Body>
                        <Card.Title>Restaurant List</Card.Title>
                        <Card.Text >Full list of restaurants. Optionally sorted by borough</Card.Text>
                    </Card.Body>
                </Card>
                <br />
                <Card>
                    <Card.Body>
                        <Card.Text>Loading Restaurants...</Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
};

export default Restaurants;