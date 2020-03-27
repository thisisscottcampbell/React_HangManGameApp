import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./assets/images/0.jpg";
import img1 from "./assets/images/1.jpg";
import img2 from "./assets/images/2.jpg";
import img3 from "./assets/images/3.jpg";
import img4 from "./assets/images/4.jpg";
import img5 from "./assets/images/5.jpg";
import img6 from "./assets/images/6.jpg";
import {randomWord} from "./words"

class Hangman extends Component {
  
  static defaultProps = {
    maxWrong: 6,
    images: img0, img1, img2, img3, img4, img5, img6]
  };

  state = {
    wrongGuessTotal: 0,
    guessedLetters: new Set(),
    answer: randomWord()
  }

  guessedWord = () => {
    return this.state.answer
      //grabs "apple"
      .split("")
      //turns the string into [a, p, p, l, e]
      .map(letter => (this.state.guessedLetters.has(letter) ? letter : "_"));
      //iterates over the array and checking if guessedLetter is in the answer and if it is, it renders the letter, if not, it leaves the dash
  }

  handleGuess = (e) => {
    let letter = e.target.value;
    this.setState(stateNow => ({
      guessedLetters: stateNow.guessedLetters.add(letter),
      wrongGuessTotal: stateNow.wrongGuessTotal + (stateNow.answer.includes(letter) ? 0 : +1)
    }));
  }

  generateButtons = () => {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((letter, i) => (
      <button
        key={letter, i}
        value={letter}
        onClick={this.handleGuess}
        disabled={ this.state.guessedLetters.has(letter) }
      >
        {letter}
      </button>
    ));
  }

  reset = () => {
    this.setState({
      wrongGuessTotal: 0,
      guessedLetters: new Set(),
      answer: randomWord()
    })
  }



 
  render() {

    let isWinner = this.guessedWord().join("") === this.state.answer;
    let gameOver = this.state.wrongGuessTotal >= this.props.maxWrong;
    const altText = `${this.state.wrongGuessTotal}/${this.props.maxWrong} guesses`;
    let gameState = this.generateButtons();
    if (isWinner) gameState = "You Win!";
    if (gameOver) gameState = "YouLose";
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={ this.props.images[this.state.wrongGuessTotal] } alt={altText} />
        <p className='wrongGuess>'>Guesses Left: { this.props.maxWrong - this.state.wrongGuessTotal }</p>
        <p className='Hangman-word'>{!gameOver ? this.guessedWord() : this.state.answer}</p>
        <p className='Hangman-btns'>
          
        </p>
         
          { && <p>YOU WIN!!</p>}
        <button onClick={this.reset} id='restartButton'>New Word</button>
        
      </div>
    );
  }
}

export default Hangman;
