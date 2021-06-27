import React from 'react';
import { List } from 'semantic-ui-react';

import styles from '../App.module.css';

const ArticleList = (props) => {
    console.log(props)
    return (
        <List divided className={styles.list}>
            {
                props.articles.map((article, index) => (
                    <List.Item key={article.title + index}>{article.title}</List.Item>
                ))
            }
        </List>
    );
};

export default ArticleList;
