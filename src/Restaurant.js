import { useEffect, useState } from "react";
import { Card, CardDeck } from "react-bootstrap";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

const Restaurant = props => {
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`https://restaurants-api-2021.herokuapp.com/api/restaurants/${props.id}`)
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                data.hasOwnProperty('_id') ? setRestaurant(data) : setRestaurant(null);
            })
    }, [props.id]);

    if (!loading) {
        if (restaurant) {
            return (
                <div>
                    <Card>
                        <Card.Body>
                            <Card.Title>{restaurant.name}</Card.Title>
                            <Card.Text>{restaurant.address.building} {restaurant.address.street}</Card.Text>
                        </Card.Body>
                    </Card>
                    <br />
                    <MapContainer style={{ "height": "400px" }} center={[restaurant.address.coord[1], restaurant.address.coord[0]]} zoom={13} scrollWheelZoom={false}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={[restaurant.address.coord[1], restaurant.address.coord[0]]} />
                    </MapContainer>
                    <br />
                    <h5>Ratings</h5>
                    <hr />
                    <CardDeck>
                        {
                            restaurant.grades.map((grade, index) => (
                                <Card key={index}>
                                    <Card.Body>
                                        <Card.Text>Grade: {grade.grade}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer>Completed: {new Date(grade.date).toLocaleDateString()}</Card.Footer>
                                </Card>
                            ))
                        }
                    </CardDeck>
                </div>
            )
        } else {
            return (
                <div>
                    <Card>
                        <Card.Body>
                            <Card.Text>Unable to find Restaurant with id: {props.id}</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            )
        }
    } else {
        return (
            <div>
                <Card>
                    <Card.Body>
                        <Card.Text>Loading Restaurant Data...</Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
};


export default Restaurant;
