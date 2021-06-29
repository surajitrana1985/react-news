import React from 'react';
import { List, Grid, Header, Image } from 'semantic-ui-react';

import styles from '../App.module.css';

const ArticleItem = (props) => {
    const { article } = props;
    return (
        <List.Item className={styles.articleItem}>
            <Grid>
                <Grid.Column width={11} className={styles.gridColumn}>
                    <Header as="h3">{article.title}</Header>
                    <List.Description className={styles.listDescription}>
                        {article.description}
                    </List.Description>
                    <List bulleted horizontal>
                        <List.Item>
                            <a href={article.url}>{article.source.name}</a>
                        </List.Item>
                        <List.Item>
                            {article.publishedAt.split('T')[0]}
                        </List.Item>
                    </List>
                </Grid.Column>
                <Grid.Column width={5}>
                    <Image src={article.image} />
                </Grid.Column>
            </Grid>
        </List.Item>
    );
};

export default ArticleItem;
