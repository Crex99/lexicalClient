
import './App.css';
import React from "react";
import ReactWordcloud from 'react-wordcloud';
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"
import "bootstrap/dist/css/bootstrap.min.css"
import Table from "react-bootstrap/Table"
import axios from "axios";
import LoadingIcons from 'react-loading-icons'


const dev = "http://localhost:8080/"

const build = "https://enchancing-lexical.herokuapp.com/"


function App({ changeMode, mode, labels, handleLang, ready, handleWord, handleLimit, results, wordCloudAnimator, handleClick, handleOperation, message }) {
	console.log("results", results)
	return (<div className="App">
		<div className="content"></div>
		<Button className="ChangeMode" onClick={ changeMode }>{ mode }</Button>
		<h1>INSPIRATING MODE</h1>
		<Form>
			<Form.Group>
				<Form.Label >{ labels[0] }</Form.Label>
				<Form.Control id="word" type="text" placeholder="choose a word to search..." onChange={ handleWord }></Form.Control>
				<Form.Label >{ labels[1] }</Form.Label>
				<Form.Select id="lang" type="text" onChange={ handleLang } >
					<option value="en">Inglese(en)</option>
					<option value="it">Italiano(it)</option>
					<option value="fr">Francese(fr)</option>
					<option value="de">Tedesco(de)</option>
					<option value="ol">Olandese(ol)</option>
				</Form.Select>
				<Form.Select hidden onChange={ handleOperation }>
					<option hidden value="inspiration"></option>
				</Form.Select>
				<Form.Label >{ labels[3] }</Form.Label>
				<Form.Control id="limit" type="number" placeholder="10" onChange={ handleLimit }></Form.Control>
			</Form.Group>
			<Button onClick={ handleClick }>GO</Button>
		</Form>
		<div hidden={ ready }><LoadingIcons.Circles />
			<p>LOADING...</p></div>
		<p>{ message }</p>
		<Table responsive striped bordered hover variant="dark">
			<thead>
				<tr>
					<th>RESULTS</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						{ results.map((element) => {
							return (<div>{ element }</div>)
						}) }
					</td>
				</tr>
			</tbody>
		</Table>
	</div>)
}


export default App;
