import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import Card from "../../components/Card";
import { DeleteBtn, SaveBtn } from "../../components/Btn";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import API from "../../utils/API";

class Articles extends Component {
  state = {
    topic: "",
    startDate: "",
    endDate: "",
    articles: [],
    savedArticles: []
  }

  handleInputChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = event => {
    event.preventDefault();

    API.getNewArticles(this.state.topic, this.state.startDate, this.state.endDate)
      .then(res => {
        const articles = res.data.response.docs.filter((doc, index) => (index < 5));
        this.setState({ 
          articles: articles,
          topic: "",
          startDate: "",
          endDate: ""
        });
        console.log(this.state.articles);
      })
      .catch(err => console.log(err))
  }

  handleSave = event => {
    let currentArticle = this.state.articles[event.target.id];

    let newSavedArticle = {
      headline: currentArticle.headline.main,
      url: currentArticle.web_url,
      byline: currentArticle.byline.original
    }

    console.log(newSavedArticle);

    API.saveArticle(newSavedArticle)
      .then(res => this.getSavedArticles)
      .catch(err => console.log(err))
  }

  getSavedArticles = () => {
    API.getSavedArticles()
      .then(res => {
        let newSavedArr = [...this.state.savedArticles, res.data];
        this.setState({ savedArticles: newSavedArr })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <h1>New York Times Article Scraper</h1>
          <h3>Search for and annotate articles of interest!</h3>
        </Jumbotron>
        <Container>
          <Card cardTitle="Search">
            <Input name="topic" placeholder="Topic" onChange={this.handleInputChange} value={this.state.topic} />
            <Row>
              <Col size="md-6">
                <Input name="startDate" placeholder="Start Date (in format YYYYMMDD)" onChange={this.handleInputChange} value={this.state.startDate} />
              </Col>
              <Col size="md-6">
                <Input name="endDate" placeholder="End Date (in format YYYYMMDD)" onChange={this.handleInputChange} value={this.state.endDate} />
              </Col>
            </Row>
            <FormBtn onClick={this.handleSubmit} >Search</FormBtn>
          </Card>
          <Card cardTitle="Results">
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map((article, index) => (
                  <ListItem key={index}>
                    {article.headline.main}
                    <SaveBtn id={index} onClick={this.handleSave} />
                  </ListItem>
                ))}
              </List>
            ) : ( <p>"No articles yet."</p> )}
          </Card>
          <Card cardTitle="Saved Articles">
            {this.state.savedArticles.length ? (
              <List>
                {this.state.savedArticles.map((article, index) => (
                  <ListItem key={index}>
                    {article.headline.main}
                  </ListItem>
                ))}
              </List>
            ) : ( <p>"No saved articles yet."</p> )}
          </Card>
        </Container>
      </div>
    )
  }
}

export default Articles;