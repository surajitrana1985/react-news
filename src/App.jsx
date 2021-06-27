import { Component } from 'react';
import { Menu, Input, Image } from 'semantic-ui-react';

import { fetchTrends } from './services/news-api.service';
import styles from './App.module.css';
import { NEWS_API_KEY } from './config/api-config';

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
			</div>
		);
	}

}

export default App;
