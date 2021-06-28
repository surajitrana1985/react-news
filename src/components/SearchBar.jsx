import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

import styles from '../App.module.css';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTopic: '',
            topicSearch: props.topicSearch
        };
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        if (this.state.searchTopic !== '') {
            this.props.topicSearch(this.state.searchTopic);
        }
    }

    handleInputChange = (event) => {
        this.setState({
            searchTopic: event.target.value
        });
    }

    render() {
        return (
            <div className={styles.searchContainer}>
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Group>
                        <Form.Input placeholder="Search topic ..."
                            name="topic" value={this.state.searchTopic}
                            onChange={this.handleInputChange} />
                        <button type="submit" className={styles.searchButton}>Submit</button>
                    </Form.Group>
                </Form>
            </div>
        );
    }

}

export default SearchBar;
