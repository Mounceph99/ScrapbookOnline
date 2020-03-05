import React from "react";

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: "name",
            password: "password",
            posts: [],
            followed: [],
            followers: [],
        };
    }

    addFollowed(props) {
        this.setState((state, props) => {
            return {follwed: state.followed.push(props.user)};
        });
        props.user.notify(this);
    }

    notify(user) {
        console.log("You are now being followed by " + user.state.name);
    }

    // TODO
    render() {
        return (
            <div>

            </div>
        );
    }

}