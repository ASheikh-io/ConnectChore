// Need for React and Redux
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
// Local Components
import BackToDashboard from "../back-to-dashboard/BackToDashboard";
// API calls
import API from "../../utils/API";
// utils
import filterDeleted from "../../utils/filterDeleted";
// CSS
import "../../App.css";
import SubNav from "../layout/SubNav";

class Rewards extends Component {

    constructor(props) {
        super(props)
        this.state = {
            reward: "",
            pointvalue: "",
            rewards: [],
            auth: {}
        }
    }

    // get all rewards for the user from the db, set state with undeleted rewards to populate the page
    getUndeletedRewards(userId) {
        API.getRewardDescriptions(userId)
            .then(res => {
                const undeletedRewards = filterDeleted(res.data);

                this.setState(
                    {
                        rewards: undeletedRewards
                    })
            })
            .catch(err => console.log(err));
    }

    // get rewards data from the DB
    // TEST-pass: will passing in user.id to the API call successfully get us the rewards for the logged in user only?
    componentDidMount() {
        const { user } = this.props.auth

        this.getUndeletedRewards(user.id);
    }

    // get the input values and add to state
    handleInputChange = event => {
        event.preventDefault();

        this.setState(
            {
                ...this.state,
                [event.target.name]: event.target.value
                // reward and value
            }
        );
    };

    // TEST-pass: when clicking the ADD REWARD, does the reward successfully get added to rewarddescription for the logged in user only?
    addRewardClick = e => {
        // leaving commented out to refresh the whole page for now
        //e.preventDefault();

        const { user } = this.props.auth;

        const { reward, pointvalue } = this.state;

        API.addRewardDescription(
            {
                description: reward,
                value: pointvalue,
                userId: user.id
            }
        ).then(res => console.log(res))
            .catch(err => console.log(err));

    };

    handleRewardDelete = async e => {
        const { user } = this.props.auth;
        const rewardId = e.currentTarget.dataset.id;

        await API.deleteRewardDescription(
            rewardId,
            {
                isDeleted: true
            }
        )

        this.getUndeletedRewards(user.id);
    }

    // RENDER TEST-pass:
    // Clicking ADD REWARD adds reward as expected to DB for the logged in user only?
    // Clicking the X box successuflly removes the rewarddescription entry for the logged in user only?

    render() {

        return (
            <>
                <SubNav />
                <Container>
                    <br />
                    <br />
                    <br />
                    <Row>
                        <Col>
                            <BackToDashboard />
                            <Form>
                                <div>
                                    <h3>Rewards</h3>
                                    <p>Want to include some motivation to your household's day to day chores? Add potential rewards for a job well done!</p>
                                    <br />
                                    <div><b>A few examples could be:</b></div>
                                        <ul>
                                            <li>★pick-a-movie night</li>
                                            <li>★ice cream for breakfast</li>
                                            <li>★buy a new book</li>
                                            <li>★stay up late for 30 extra minutes</li>
                                        </ul>
                                    <br />
                                </div>
                                <Form.Row>
                                    <Form.Group as={Col} lg="6" controlId="formReward">
                                        <Form.Label>Add a reward:</Form.Label>
                                        <Form.Control
                                            type="input"
                                            name="reward"
                                            value={this.state.reward}
                                            placeholder="Ice Cream"
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} lg="2" controlId="formValue">
                                        <Form.Label className="form-label">Points value:</Form.Label>
                                        <Form.Control className="form-control"
                                            type="input"
                                            name="pointvalue"
                                            value={this.state.pointvalue}
                                            placeholder="10"
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <br />
                                <Button style={{
                                    width: "150px",
                                    height: "50px",
                                    fontSize: "15px",
                                    textTransform: "uppercase",
                                    borderRadius: "30px",
                                    border: "none",
                                    padding: "12px",
                                    backgroundColor: "#42b984",
                                    color: "#ffffff",
                                    letterSpacing: "1.5px"
                                }}
                                    className="btn btn-lg button-hover2"
                                    type="submit"
                                    onClick={this.addRewardClick}>Add reward</Button>
                            </Form>
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <Row>
                        <Col md={6}>
                            <br />
                            <h3>Household Rewards</h3>
                            <p>A list of the recently added rewards for completing chores.</p>
                            {/* Use undeleted rewards array in state to populate the list of rewards */}
                            {this.state.rewards.length ? (
                                <ListGroup variant="flush">
                                    {this.state.rewards.map(reward => (
                                        <ListGroup.Item
                                            key={reward._id}
                                            data-id={reward._id}
                                            className="align-items-center list-group"
                                        >
                                            {reward.description} (points: {reward.value || 0})
                                            <Button
                                                variant="light"
                                                className="float-right text-danger"
                                                data-id={reward._id}
                                                onClick={this.handleRewardDelete}
                                            >
                                                <span><i className="fas fa-times"></i></span>
                                            </Button>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ) : (
                                    <h4><br />No rewards to display!</h4>
                                )}
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </Container>
            </>
        );
    }
}

Rewards.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(Rewards);