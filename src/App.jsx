import { Component } from 'react';
import { Menu, Input, Image, Container, Header } from 'semantic-ui-react';

import { fetchTrends } from './services/news-api.service';
import styles from './App.module.css';
import { NEWS_API_KEY } from './config/api-config';
import ArticleList from './components/ArticleList';

class App extends Component {

	state = {
		articles: [],
		apiError: ''
	};

	async componentDidMount() {
		const searchParam = this.createRequestParam();
		try {
			const response = await fetchTrends(searchParam);
			this.setState({ articles: response.articles });
		} catch (error) {
			this.setState({ apiError: 'Failed to retrieve articles you searched' });
		}
	}

	createRequestParam() {
		return {
			q: 'apple',
			from: '2021-06-01',
			to: '2021-06-26',
			sortBy: 'popularity',
			apiKey: NEWS_API_KEY
		};
	}

	render() {
		const { articles, apiError } = this.state;
		return (
			<div className='App'>
				<Menu pointing className={styles.header}>
					<Menu.Item>
						<div className={styles.logo}>
							<Image src='assets/images/brand-logo.png' size='large' />
						</div>
					</Menu.Item>
					<Menu.Menu position='right'>
						<Menu.Item>
							<Input icon='search' placeholder='Search...' />
						</Menu.Item>
					</Menu.Menu>
				</Menu>
				<Container>
					<Header as="h2">Articles</Header>
					{articles.length > 0 && <ArticleList articles={articles} />}
					{apiError !== '' && <p>{{ apiError }}</p>}
				</Container>
			</div>
		);
	}

}

export default App;
