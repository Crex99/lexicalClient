import './App.css';
import React from "react";
import ReactWordcloud from 'react-wordcloud';
import { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"
import "bootstrap/dist/css/bootstrap.min.css"
import Table from "react-bootstrap/Table"
import axios from "axios";
import LoadingIcons from 'react-loading-icons'
import InspiratingMode from './InspiratingMode';

const operationList = {
	en: ["search meanings", "search meanings(is a)", "search descriptions", "search synonyms", "search images", "search emoticons", "search relations", "search translations", "search hypernyms", "search hyponyms", "search holonyms", "search meronyms", "search parts", "search parts of"],
	it: ["Cerca accezioni", "Cerca accezioni(è un)", "Cerca descrizioni", "Cerca sinonimi", "Cerca immagini", "Cerca emoticons", "Cerca relazioni", "Cerca traduzioni", "Cerca iperonimi", "Cerca iponimi", "Cerca olonimi", "Cerca meronimi", "Cerca parti", "Cerca parti di"],
	fr: ["cherche senses", "cherce senses(est un)", "cherche descriptions", "cerche synonymes", "cherche images", "cherche emoticones", "cherche relationes", "cherche traductiones", "cherche hyperonymes", "cherche holonymes", "cherche meronymes", "cherche parties", "cherche parties de"],
	de: ["suchen nach bedeutung", "suchen nach bedeutung(es ist ein)", "suchen nach beschreibung", "suchen nach synonyme", "suchen nach bilder", "suchen nach emoticons", "suchen nach beziehungen", "suchen nach ubersetzungen", "suchen nach hyperonyme", "suchen nach holonyme", "suchen nach meronyme", "suchen nach losfahren", "suchen nach losfahren von"],
	ol: ["zoeken naar betekenissen", "zoeken naar betekenissen(het is een)", "zoeken naar beschrijvingen", "zoeken naar synoniemen", "zoeken naar afbeeldingen", "zoeken naar emoticons", "zoeken naar relaties", "zoeken naar vertalingen", "zoeken naar hyperoniemen", "zoeken naar hyponiemen", "zoeken naar holoniemen", "zoeken naar meroniemen", "zoeken naar vertrek", "zoeken naar onderdelen van"]
}

const labelList = {
	en: ["Choose a word to research", "choose the word's language", "choose what to research", "set a limit", "choose the language to translate"],
	it: ["Scegli una parola da ricercare", "Scegli la lingua della parola", "Scegli cosa vuoi cercare", "Imposta un limite", "Scegli la lingua in cui tradurre"],
	fr: ["choisis un mot à rechercher", "choisis la langue du mot", "choisis ce que tu voules chercher", "fixer une limite", "choisis la langue vers laquelle traduire"],
	de: ["wähle das Wort aus forschen", "wähle die Sprache des Wortes", "wähle was du willst forschen", "eine Grenze setzen", "wähle die Sprache übersetzen in"],
	ol: ["kies een woord om op te zoeken", "kies de taal van het woord", "kies waarnaar u wilt zoeken", "stel een limiet in", "kies de taal om naar te vertalen"]
}

const dev = "http://localhost:8080/"

const build = "https://enchancing-lexical.herokuapp.com/"


const senses = "senses";
const descriptions = "descriptions";
const trads = "trads";
const imgs = "imgs";
const emoticons = "emoticons";
const relations = "relations";
const synonyms = "synonyms";
const hypernyms = "hypernyms";
const hyponyms = "hyponyms";
const holonyms = "holonyms";
const meronyms = "meronyms";
const isA = "isA";
const partOf = "partOf";
const hasPart = "hasPart";
const inspiration = "inspiration";

const wordCloudAnimator = (arr) => {
	if (arr.length > 0) {
		return (
			<ReactWordcloud words={ arr } />
		)
	}
}
function App() {

	const [message, setmessage] = useState("")
	const [results, setResults] = useState([])
	const [mode, setMode] = useState("INSPIRATING")
	const [ready, setReady] = useState(true)
	const [labels, setlabels] = useState(labelList["en"])
	const [operations, setOperations] = useState(operationList["en"])
	const [limit, setlimit] = useState(10)
	const [controlTrad, setControlTrad] = useState(true)
	const [trad, setTrad] = useState("en")
	const [word, setWord] = useState("")
	const [lang, setLang] = useState("en")
	const [operation, setOperation] = useState("senses")
	//DBPEDIA
	const [DBPTime, setDBPTime] = useState(0)
	const [descriptionsDBP, setDescriptionsDBP] = useState([])
	const [imgsDBP, setImgsDBP] = useState([])
	const [synsDBP, setSynsDBP] = useState([])
	const [tradsDBP, setTradsDBP] = useState([])
	const [hypernymsDBP, setHypernymsDBP] = useState([])
	const [relsDBP, setRelsDBP] = useState([])
	//DBNARY
	const [DBNTime, setDBNTime] = useState(0)
	const [descriptionsDBN, setDescriptionsDBN] = useState([])
	const [synsDBN, setSynsDBN] = useState([])
	const [relsDBN, setRelsDBN] = useState([])
	const [hypernymsDBN, setHypernymsDBN] = useState([])
	const [hyponymsDBN, setHyponymsDBN] = useState([])
	const [holonymsDBN, setHolonymsDBN] = useState([])
	const [meronymsDBN, setMeronymsDBN] = useState([])
	//WIKIDATA
	const [WikiTime, setWikiTime] = useState(0)
	const [descriptionsWiki, setDescriptionsW] = useState([])
	const [synsWiki, setSynsW] = useState([])
	const [imgsWiki, setImgsW] = useState([])
	const [emotesWiki, setEmotesW] = useState([])
	const [relsWiki, setRelsW] = useState([])
	const [tradsWiki, setTradsW] = useState([])
	const [hypernymsWiki, setHypernymsW] = useState([])
	//BABELNET
	const [BabelTime, setBabelTime] = useState(0)
	const [sensesBabel, setSensesB] = useState([])
	const [synsBabel, setSynsB] = useState([])
	const [imgsBabel, setImgsB] = useState([])
	const [emotesBabel, setEmotesB] = useState([])
	const [relsBabel, setRelsB] = useState([])
	const [tradsBabel, setTradsB] = useState([])
	const [hypernymsBabel, setHypernymsB] = useState([])
	const [hyponymsBabel, setHyponymsB] = useState([])
	const [holonymsBabel, setHolonymsB] = useState([])
	const [meronymsBabel, setMeronymsB] = useState([])
	const [descriptionsBabel, setDescriptionsB] = useState([])
	const [relValBabel, setRelValB] = useState([])
	//CONCEPTNET
	const [ConceptTime, setConceptTime] = useState(0)
	const [sensesConcept, setSensesC] = useState([])
	const [synsConcept, setSynsC] = useState([])
	const [emotesConcept, setEmotesC] = useState([])
	const [relsConcept, setRelsC] = useState([])
	const [tradsConcept, setTradsC] = useState([])
	const [holonymsConcept, setHolonymsC] = useState([])
	const [meronymsConcept, setMeronymsC] = useState([])
	const [descriptionsConcept, setDescriptionsC] = useState([])
	const reset = () => {
		setmessage("")
		setResults([])
		setRelsDBP([])
		setDescriptionsC([])
		setMeronymsC([])
		setHolonymsC([])
		setTradsC([])
		setRelsC([])
		setEmotesC([])
		setSynsC([])
		setSensesC([])
		setConceptTime(0)
		setRelValB([])
		setDescriptionsB([])
		setHypernymsB([])
		setHypernymsDBN([])
		setHypernymsDBP([])
		setHypernymsW([])
		setHyponymsB([])
		setHyponymsDBN([])
		setHolonymsB([])
		setHolonymsDBN([])
		setMeronymsB([])
		setMeronymsDBN([])
		setRelsW([])
		setDBPTime(0)
		setDBNTime(0)
		setWikiTime(0)
		setBabelTime(0)
		setDescriptionsDBP([])
		setImgsDBP([])
		setSynsDBP([])
		setDescriptionsDBN([])
		setSynsDBN([])
		setDescriptionsW([])
		setSynsW([])
		setImgsW([])
		setSensesB([])
		setSynsB([])
		setImgsB([])
		setEmotesW([])
		setEmotesB([])
		setRelsDBN([])
		setRelsB([])
		setTradsDBP([])
		setTradsW([])
		setTradsB([])
	}

	const changeMode = () => {
		reset()
		if (mode === "LEARNING") {
			setMode("INSPIRATING")
			setOperation("senses")
		} else {
			setMode("LEARNING")
			setOperation("inspirating")
		}
		console.log("operation", operation)
		console.log("mode", mode)

	}

	const handleLimit = (e) => {
		setlimit(e.target.value)
	}

	const handleWord = (e) => {
		setWord(e.target.value)
	}

	const handleLang = (e) => {
		setLang(e.target.value)
		setOperations(operationList[e.target.value])
		setlabels(labelList[e.target.value])
	}
	const handleOperation = (e) => {
		if (e.target.value === "trads") {
			setControlTrad(false)
		} else {
			setControlTrad(true)
		}
		setOperation(e.target.value)
	}

	const handleTrad = (e) => {
		setTrad(e.target.value)
	}

	const handleClick = () => {
		console.log("word", word)
		if (word === "") {
			setmessage("MISSING WORD")
		} else {
			setReady(false)
			reset()
			let request = dev
			switch (operation) {
				case "senses":
					request += senses
					break;
				case "synonyms":
					request += synonyms
					break;
				case "imgs":
					request += imgs
					break;
				case "emotes":
					request += emoticons
					break;
				case "rel":
					request += relations
					break;
				case "trads":
					request += trads
					break;
				case "hyponyms":
					request += hyponyms
					break;
				case "hypernyms":
					request += hypernyms
					break;
				case "holonyms":
					request += holonyms
					break;
				case "meronyms":
					request += meronyms
					break;
				case "descriptions":
					request += descriptions
					break;
				case "isA":
					request += isA
					break;
				case "partOf":
					request += partOf
					break;
				case "hasPart":
					request += hasPart
					break;
				case "inspirating":
					request += inspiration
					console.log("inspiration")
					break;
			}

			axios.post(request, {
				word: word,
				lang: lang,
				langs: trad,
				limit: limit
			}).then((res) => {
				console.log(res)
				setReady(true)
				let inspireSet = new Set()
				let inspireArr = []
				res.data.data.forEach(element => {
					switch (operation) {
						case "senses":
							/*if (element.source === "WIKIDATA") {
								setSensesW(element.inf)
								setWikiTime(element.time)
							}
							if (element.source === "DBNARY") {
								setSensesDBN(element.inf)
								setDBNTime(element.time)
							}
							if (element.source === "DBPEDIA") {
								setDBPTime(element.time)
								setSensesDBP(element.inf)
							}*/
							if (element.source === "CONCEPTNET") {
								setConceptTime(element.time)
								let arr = []
								element.inf.forEach(element => {
									arr.push(element)
								})
								setSensesC(arr)
							}
							if (element.source === "BABELNET") {
								setBabelTime(element.time)
								let set = new Set()
								let arr = []
								element.inf.forEach(element => {
									element.descriptions.forEach(element => {
										set.add(element)
									})
								});
								set.forEach(element => {
									arr.push(element)
								});
								setSensesB(arr)
							}
							break;
						case "descriptions":
							if (element.source === "CONCEPTNET") {
								setConceptTime(element.time)
								let arr = []
								element.inf.forEach(element => {
									arr.push(element)
								})
								setDescriptionsC(arr)
							}
							if (element.source === "BABELNET") {
								setBabelTime(element.time)
								let set = new Set()
								let arr = []
								element.inf.forEach(element => {
									element.descriptions.forEach(element => {
										set.add(element)
									})
								});
								set.forEach(element => {
									arr.push(element)
								});
								setSensesB(arr)
							}
							if (element.source === "WIKIDATA") {
								setWikiTime(element.time)
								setDescriptionsW(element.inf)
							}
							if (element.source === "DBPEDIA") {
								setDBPTime(element.time)
								setDescriptionsDBP(element.inf)
							}
							if (element.source === "DBNARY") {
								setDBNTime(element.time)
								setDescriptionsDBN(element.inf)
							}
							break;
						case "synonyms":
							if (element.source === "CONCEPTNET") {
								setConceptTime(element.time)
								let arr = []
								element.inf.forEach(element => {
									arr.push({ text: element.word, value: 64 })
								})
								setSynsC(arr)
							}
							if (element.source === "WIKIDATA") {
								setWikiTime(element.time)
								let arr = []
								element.inf.forEach(element => {
									element.synonyms.forEach(element => {
										arr.push({ text: element, value: 64 })
									});
								});
								setSynsW(arr)
							}
							if (element.source === "DBNARY") {
								let arr = []
								setDBNTime(element.time)
								element.inf.forEach(element => {
									arr.push({ text: element, value: 64 })
								});
								setSynsDBN(arr)
							}
							if (element.source === "BABELNET") {
								setBabelTime(element.time)
								let set = new Set([])

								element.inf.forEach(element => {

									element.synonyms.forEach(element => {
										set.add(element)
									});

								});

								let arr = []
								set.forEach(element => {
									arr.push({ text: element, value: 64 })
								});

								setSynsB(arr)
							}
							if (element.source === "DBPEDIA") {
								let arr = []
								setDBPTime(element.time)
								element.inf.forEach(element => {
									arr.push({ text: element, value: 64 })
								});
								setSynsDBP(arr)
							}
							break;
						case "imgs":
							if (element.source === "WIKIDATA") {
								setWikiTime(element.time)
								setImgsW(element.inf)
							}
							if (element.source === "BABELNET") {
								setBabelTime(element.time)

								let arr = []
								element.inf.forEach(element => {
									element.images.forEach(element => {
										arr.push(element.url)
									});
								});
								setImgsB(arr)
							}
							if (element.source === "DBPEDIA") {
								setDBPTime(element.time)
								setImgsDBP(element.inf)
							}
							break;
						case "emotes":
							if (element.source === "CONCEPTNET") {
								setConceptTime(element.time)
								let arr = []
								element.inf.forEach(element => {
									arr.push(element)
								})
								setEmotesC(arr)
							}
							if (element.source === "WIKIDATA") {
								setWikiTime(element.time)
								let arr = []
								element.inf.forEach(element => {
									console.log(element.emotes)
									element.emotes.forEach(element => {
										arr.push(element)
									});
								});
								setEmotesW(arr)
							}
							if (element.source === "BABELNET") {
								setBabelTime(element.time)

								let arr = []

								element.inf.forEach(element => {
									element.emotes.forEach(element => {
										arr.push(element)
									})
								});
								setEmotesB(arr)
							}
							break;
						case "rel":
							if (element.source === "DBPEDIA") {
								setDBPTime(element.time)
								setRelsDBP(element.inf)
							}
							if (element.source === "CONCEPTNET") {
								setConceptTime(element.time)
								let arr = []
								element.inf.forEach(element => {
									arr.push(element)
								})
								setRelsC(arr)
							}
							if (element.source === "WIKIDATA") {
								setWikiTime(element.time)
								setRelsW(element.inf)
							}

							if (element.source === "DBNARY") {
								setDBNTime(element.time)
								setRelsDBN(element.inf)
							}
							if (element.source === "BABELNET") {
								let set = new Set()
								setBabelTime(element.time)

								let arr = []

								element.inf.forEach(element => {
									element.relations.forEach(element => {
										set.add(element)
									});
								});
								set.forEach(element => {
									arr.push(element)
								});
								setRelsB(arr)
							}
							break;

						case "trads":
							if (element.source === "CONCEPTNET") {
								setConceptTime(element.time)
								let arr = []
								element.inf.forEach(element => {
									arr.push(element)
								})
								setTradsC(arr)
							}
							if (element.source === "WIKIDATA") {
								setWikiTime(element.time)
								let arr = []
								let set = new Set()
								console.log("request", request)
								console.log(element.inf)
								element.inf.forEach(element => {
									element.trads.forEach(element => {
										set.add(element.content)

									});
								});
								set.forEach(element => {
									arr.push(element)
								});
								setTradsW(arr)
							}
							if (element.source === "DBPEDIA") {
								setDBPTime(element.time)
								let arr = []
								element.inf.forEach(element => {
									arr.push(element.word)
								});
								setTradsDBP(arr)
							}

							if (element.source === "BABELNET") {
								let set = new Set()
								setBabelTime(element.time)
								let arr = []
								element.inf.forEach(element => {
									element.trads.forEach(element => {
										set.add(element.content)

									});
								});
								set.forEach(element => {
									arr.push(element)
								});
								setTradsB(arr)
							}
							break;
						case "hypernyms":
							if (element.source === "BABELNET") {
								setBabelTime(element.time)
								let set = new Set()
								let arr = []
								element.inf.forEach(element => {
									element.hierarchy.forEach(element => {
										set.add(element)
									});
								});
								set.forEach(element => {
									arr.push(element)
								});
								setHypernymsB(arr)
							}
							if (element.source === "DBNARY") {
								setDBNTime(element.time)
								setHypernymsDBN(element.inf)
							}
							if (element.source === "WIKIDATA") {
								setWikiTime(element.time)
								setHypernymsW(element.inf)
							}
							if (element.source === "DBPEDIA") {
								setDBPTime(element.time)
								setHypernymsDBP(element.inf)
							}
							break;
						case "hyponyms":
							if (element.source === "BABELNET") {
								setBabelTime(element.time)
								let set = new Set()
								let arr = []
								element.inf.forEach(element => {
									element.hierarchy.forEach(element => {
										set.add(element)
									});
								});
								set.forEach(element => {
									arr.push(element)
								});
								setHyponymsB(arr)
							}
							if (element.source === "DBNARY") {
								setDBNTime(element.time)
								setHyponymsDBN(element.inf)

							}
							break;
						case "holonyms":
							if (element.source === "CONCEPTNET") {
								setConceptTime(element.time)
								let arr = []
								element.inf.forEach(element => {
									arr.push(element)
								})
								setHolonymsC(arr)
							}
							if (element.source === "BABELNET") {
								setBabelTime(element.time)
								let set = new Set()
								let arr = []
								element.inf.forEach(element => {
									element.hierarchy.forEach(element => {
										set.add(element)
									});
								});
								set.forEach(element => {
									arr.push(element)
								});
								setHolonymsB(arr)
							}
							if (element.source === "DBNARY") {
								setDBNTime(element.time)
								setHolonymsDBN(element.inf)
							}
							break;
						case "meronyms":
							if (element.source === "CONCEPTNET") {
								setConceptTime(element.time)
								let arr = []
								element.inf.forEach(element => {
									arr.push(element)
								})
								setMeronymsC(arr)
							}
							if (element.source === "BABELNET") {
								setBabelTime(element.time)
								let set = new Set()
								let arr = []
								element.inf.forEach(element => {
									element.hierarchy.forEach(element => {
										set.add(element)
									});
								});
								set.forEach(element => {
									arr.push(element)
								});
								setMeronymsB(arr)
							}
							if (element.source === "DBNARY") {
								setDBNTime(element.time)
								setMeronymsDBN(element.inf)
							}
							break;
						case "isA":

							if (element.source === "BABELNET") {
								setBabelTime(element.time)
								let set = new Set()
								let arr = []
								element.inf.forEach(element => {
									element.hierarchy.forEach(element => {
										set.add(element)
									});

								});

								set.forEach(element => {
									arr.push(element)
								});

								setRelValB(arr)
							}
							break;
						case "hasPart":

							if (element.source === "BABELNET") {
								setBabelTime(element.time)
								let set = new Set()
								let arr = []
								element.inf.forEach(element => {
									element.hierarchy.forEach(element => {
										set.add(element)
									});

								});

								set.forEach(element => {
									arr.push(element)
								});

								setRelValB(arr)
							}
							break;
						case "partOf":
							if (element.source === "BABELNET") {
								setBabelTime(element.time)
								let set = new Set()
								let arr = []
								element.inf.forEach(element => {
									element.hierarchy.forEach(element => {
										set.add(element)
									});

								});

								set.forEach(element => {
									arr.push(element)
								});

								setRelValB(arr)
							}
							break;
						case "inspirating":

							if (element.source === "BABELNET") {
								element.inf.forEach(element => {
									console.log(element.datas)
									element.datas.forEach(element => {
										inspireSet.add(element)
									});

								});
							}
							break;
					}

				});
				inspireSet.forEach(element => {
					inspireArr.push(element)
				});

				setResults(inspireArr)
			}).catch((err) => {
				console.log("err", err)
			})
		}
	}

	if (mode === "INSPIRATING") {
		return (
			<div className="App">
				<div className="content"></div>
				<Button className="ChangeMode" onClick={ changeMode }>{ mode }</Button>
				<h1>LEARNING MODE</h1>
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
						<Form.Label >{ labels[2] }</Form.Label>
						<Form.Select onChange={ handleOperation }>
							<option value="senses">{ operations[0] }</option>
							<option value="isA">{ operations[1] }</option>
							<option value="descriptions">{ operations[2] }</option>
							<option value="synonyms">{ operations[3] }</option>
							<option value="imgs">{ operations[4] }</option>
							<option value="emotes">{ operations[5] }</option>
							<option value="rel">{ operations[6] }</option>
							<option value="trads">{ operations[7] }</option>
							<option value="hypernyms">{ operations[8] }</option>
							<option value="hyponyms">{ operations[9] }</option>
							<option value="holonyms">{ operations[10] }</option>
							<option value="meronyms">{ operations[11] }</option>
							<option value="hasPart">{ operations[12] }</option>
							<option value="partOf">{ operations[13] }</option>
						</Form.Select>
						<Form.Label >{ labels[3] }</Form.Label>
						<Form.Control id="limit" type="number" placeholder="10" onChange={ handleLimit }></Form.Control>
						<Form.Label hidden={ controlTrad } >{ labels[4] }</Form.Label>
						<Form.Select id="trad" type="text" hidden={ controlTrad } onChange={ handleTrad }>
							<option value="it">Italiano(it)</option>
							<option value="en">Inglese(en)</option>
							<option value="fr">Francese(fr)</option>
							<option value="de">Tedesco(de)</option>
							<option value="ol">Olandese(ol)</option>
						</Form.Select>
					</Form.Group>
					<Button onClick={ handleClick }>GO</Button>
				</Form>
				<div hidden={ ready }><LoadingIcons.Circles />
					<p>LOADING...</p></div>
				<p>{ message }</p>
				<Table responsive striped bordered hover variant="dark">
					<thead>
						<tr>
							<th>WIKIDATA</th>
							<th>DBNARY</th>
							<th>DBPEDIA</th>
							<th>BABELNET</th>
							<th>CONCEPTNET</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>TIME:{ WikiTime }ms</td>
							<td>TIME:{ DBNTime }ms</td>
							<td>TIME:{ DBPTime }ms</td>
							<td>TIME:{ BabelTime }ms</td>
							<td>TIME:{ ConceptTime }ms</td>
						</tr>

						<tr>
							<td>
								<ul>
									{ relsWiki.map((element) => {
										return (
											<li>{ element }</li>
										)
									}) }
									{ emotesWiki.map((element) => {
										return (
											<li>{ element }</li>
										)
									}) }
									{ wordCloudAnimator(synsWiki) }
									{ imgsWiki.map((element) => {
										return (
											<li className="ImgsContainer"><img src={ element } alt="immagine non trovata" /></li>
										)
									}) }
									{
										descriptionsWiki.map((element) => {
											return (

												<li>{ element.category }</li>

											)
										}) }
									{ tradsWiki.map((element) => {
										return (
											<li>{ element }</li>
										)
									}) }
									{ hypernymsWiki.map((element) => {
										return (
											<li>{ element }</li>
										)
									}) }
								</ul>
							</td>
							<td>
								{ wordCloudAnimator(synsDBN) }
								<ul>
									{ descriptionsDBN.map((element) => {
										return (
											<li>{ element }</li>
										)
									}) }
									{ relsDBN.map((element) => {
										return (
											<li>{ element }</li>
										)
									}) }
									{ hypernymsDBN.map((element) => {
										return (
											<li>{ element }</li>
										)
									}) }
									{ hyponymsDBN.map((element) => {
										return (
											<li>{ element }</li>
										)
									}) }
									{ holonymsDBN.map((element) => {
										return (
											<li>{ element }</li>
										)
									}) }
									{ meronymsDBN.map((element) => {
										return (
											<li>{ element }</li>
										)
									}) }
								</ul>
							</td>
							<td>
								{ relsDBP.map((element) => {
									return (
										<li>{ element }</li>
									)
								}) }
								{ descriptionsDBP }
								{ wordCloudAnimator(synsDBP) }
								<ul>{ tradsDBP.map((element) => {
									return (
										<li>{ element }</li>
									)
								}) }

									{ imgsDBP.map((element) => {
										return (
											<li className="ImgsContainer"><img src={ element } alt="immagine non trovata" /></li>
										)
									}) }
									{ hypernymsDBP.map((element) => {
										return (
											<li>{ element }</li>
										)
									}) }
								</ul>
							</td>
							<td>
								{ wordCloudAnimator(synsBabel) }
								<ul>
									{ descriptionsBabel.map((element) => {
										return (
											<li>{ element }</li>
										)
									}) }
									{ imgsBabel.map((element) => {
										return (
											<li className="ImgsContainer"><img src={ element } alt="immagine non trovata" /></li>
										)
									}) }
									{ sensesBabel.map((element) => {
										return (
											<li>{ element }</li>
										)
									}) }
									{ tradsBabel.map((element) => {
										return (
											<li>{ element }</li>
										)
									}) }
									{ emotesBabel.map((element) => {
										return (
											<li>{ element }</li>
										)
									}) }
									{ relsBabel.map((element) => {
										return (
											<li>{ element }</li>
										)
									}) }
									{ hypernymsBabel.map((element) => {
										return (
											<li>{ element }</li>
										)
									}) }
									{ hyponymsBabel.map((element) => {
										return (
											<li>{ element }</li>
										)
									}) }
									{ holonymsBabel.map((element) => {
										return (
											<li>{ element }</li>
										)
									}) }

									{ meronymsBabel.map((element) => {
										return (
											<li>{ element }</li>
										)
									}) }
									{ relValBabel.map((element) => {
										return (
											<li>{ element }</li>
										)
									}) }
								</ul>
							</td>
							<td>
								{ wordCloudAnimator(synsConcept) }
								<ul>
									{ sensesConcept.map((element) => {
										return (
											<li>{ element.word }</li>
										)
									}) }
									{ descriptionsConcept.map((element) => {
										return (
											<li>{ element.word }</li>
										)
									}) }
									{ emotesConcept.map((element) => {
										return (
											<li>{ element.word }</li>
										)
									}) }
									{ relsConcept.map((element) => {
										return (
											<li>{ element.word }</li>
										)
									}) }
									{ tradsConcept.map((element) => {
										return (
											<li>{ element.word }</li>
										)
									}) }
									{ holonymsConcept.map((element) => {
										return (
											<li>{ element.word }</li>
										)
									}) }
									{ meronymsConcept.map((element) => {
										return (
											<li>{ element.word }</li>
										)
									}) }
								</ul></td>
						</tr>
					</tbody>
				</Table>
			</div>
		);
	} else {

		return InspiratingMode({
			changeMode: changeMode,
			mode: mode,
			labels: labels,
			handleLang: handleLang,
			ready: ready,
			handleWord: handleWord,
			results: results,
			handleLimit: handleLimit,
			wordCloudAnimator: wordCloudAnimator,
			handleClick: handleClick,
			handleOperation: handleOperation,
			message: message
		})

	}

}

export default App;
