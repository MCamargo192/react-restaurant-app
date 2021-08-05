import { Card, Image } from "react-bootstrap";

const About = () => (
    <div>
        <Card bg="light">
            <Card.Body>
                <Card.Title>About</Card.Title>
                <Card.Text>
                    All about me- the developer.
                 </Card.Text>
            </Card.Body>
        </Card>
        <br />
        <Card style={{ width: '100%' }}>
            <Card.Body>
                <Card.Title>Marcelo Camargo</Card.Title>
                <Card.Text><p>I'm a Junior Web Developer, with a bit more than a year of experience in web development.</p> <p>I've worked in a few small projects using HTML, CSS, Bootstrap, Javascript, JQuery, React, Node.JS, Express.JS, MongoDB, etc.</p>
                <p>Here is some of my projects:</p>
                <ul>
                <li><a target="_blank" href="https://wereotakus.netlify.app/"><strong>We're Otakus</strong></a> - An action figures shop </li>
                <li><a target="_blank" href="https://livefood.herokuapp.com/"><strong>LiveFood</strong></a> - An shop and delivery of healthy foods </li>
                </ul>
                <p>To check other of projects, <a target="_blank" href="https://github.com/MCamargo192/">click here</a>.</p></Card.Text>
            </Card.Body>
        </Card>
    </div>
);

export default About;