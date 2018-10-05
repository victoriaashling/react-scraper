import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import API from "../../utils/API";

class Books extends Component {
  // Initialize this.state.books as an empty array
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: ""
  };

  // Add code here to get all books from the database and save them to this.state.books

  componentDidMount() {
    this.getAllBooks()
  }

  getAllBooks = () => {
    API.getBooks()
      .then(res => this.setState({ books: res.data }))
      .catch(err => console.log(err))
  }

  handleInputChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = event => {
    event.preventDefault();
    let newBook = {
      title: this.state.title,
      author: this.state.author,
      synopsis: this.state.synopsis
    }

    API.saveBook(newBook)
      .then(res => {
        this.setState({
          title: "",
          author: "",
          synopsis: ""
        })
        this.getAllBooks()
      })
      .catch(err => console.log(err))

  }

  deleteBook = event => {
    let id = event.target.id
    API.deleteBook(id)
      .then(res => {
        this.getAllBooks();
      })    
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input name="title" placeholder="Title (required)" onChange={this.handleInputChange} value={this.state.title} />
              <Input name="author" placeholder="Author (required)" onChange={this.handleInputChange} value={this.state.author} />
              <TextArea name="synopsis" placeholder="Synopsis (Optional)" onChange={this.handleInputChange} value={this.state.synopsis} />
              <FormBtn onClick={this.handleSubmit}>Submit Book</FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <a href={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </a>
                    <DeleteBtn onClick={this.deleteBook} id={book._id} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
