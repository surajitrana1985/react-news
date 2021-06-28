import React, { Component } from 'react';
import { Menu, Image, Container, Header, Dimmer, Loader } from 'semantic-ui-react';

import { fetchTrends, latestTrends } from './services/news-api.service';
import styles from './App.module.css';
import { NEWS_API_KEY } from './config/api-config';
import ArticleList from './components/ArticleList';
import SearchBar from './components/SearchBar';

class App extends Component {

	state = {
		articles: [],
		searchTopic: '',
		totalResults: 0,
		loading: false,
		apiError: '',
		latest: true
	};

	async componentDidMount() {
		this.setState({ loading: true, articles: [], latest: true });
		try {
			const response = await latestTrends(NEWS_API_KEY);
			if (response && response.articles) {
				this.setApplicationState(response, '', true);
			}
		} catch (error) {
			this.setState({
				apiError: 'Failed to retrieve articles you searched',
				loading: false
			});
		}
	}

	topicSearch = async (topic) => {
		this.setState({ loading: true, articles: [], latest: false });
		const searchParam = this.createRequestParam(topic);
		try {
			if (searchParam.q !== '') {
				const response = await fetchTrends(searchParam);
				if (response && response.articles) {
					this.setApplicationState(response, topic, false);
				}
			}
		} catch (error) {
			this.setState({
				apiError: 'Failed to retrieve articles you searched',
				loading: false
			});
		}
	}

	setApplicationState(response, topic, latest) {
		this.setState({
			articles: response.articles,
			searchTopic: topic,
			totalResults: response.totalResults,
			loading: false,
			latest
		});
	}

	createRequestParam(topic) {
		return {
			q: topic,
			from: '2021-06-01',
			to: '2021-06-26',
			sortBy: 'popularity',
			apiKey: NEWS_API_KEY
		};
	}

	render() {
		const {
			articles, searchTopic, totalResults,
			loading, apiError } = this.state;
		return (
			<div>
				<Menu pointing className={styles.header}>
					<Menu.Item>
						<div className={styles.logo}>
							<Image src='assets/images/brand-logo.png' size='large' />
						</div>
					</Menu.Item>
					<Menu.Menu position='right'>
						<Menu.Item>
							<SearchBar topicSearch={this.topicSearch} />
						</Menu.Item>
					</Menu.Menu>
				</Menu>
				<Container>
					{loading && (
						<Dimmer active inverted>
							<Loader inverted>Loading</Loader>
						</Dimmer>
					)}
					{!this.state.latest && articles && articles.length > 0 &&
						(<Header as="h2" className={styles.searchTags}>
							{searchTopic} search results: Found {totalResults} articles on '{searchTopic}'
						</Header>)
					}
					{this.state.latest && articles && articles.length > 0 &&
						(<Header as="h2" className={styles.searchTags}>
							Latest Trends
						</Header>)
					}
					{articles && articles.length > 0 &&
						(<ArticleList articles={articles} />)
					}
					{apiError !== '' && <p>{{ apiError }}</p>}
				</Container>
			</div>
		);
	}

}

export default App;
