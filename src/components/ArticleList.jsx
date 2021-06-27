import React from 'react';
import { List } from 'semantic-ui-react';

import styles from '../App.module.css';
import ArticleItem from './ArticleItem';

const ArticleList = (props) => {
    console.log(props)
    return (
        <List divided className={styles.list}>
            {
                props.articles.map((article, index) => (
                    <ArticleItem article={article} key={article.title + index} />
                ))
            }
        </List>
    );
};

export default ArticleList;
