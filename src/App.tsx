import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
	constructor(props: any) {
		super(props);
		this.state = {name: 'a'};
	};

	state: any;

	private change = ($event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
		$event.currentTarget.disabled = false ;
		this.setState((state: any, props) => {
			const name = state.name;
			return {name: name === 'a' ? 'b' : 'a'};
		});
	};

	public render(): React.ReactElement<any> {
		const name = this.state.name;
		if (name === 'a') {
			return (
				<div className="App">
					<button onClick={e => this.change(e)}>12</button>
					<header className="App-header">
						<img src={logo} className="App-logo" alt="logo"/>
						<p>
							{this.state.name} <code>src/App.tsx</code> and save to reload.
						</p>
						<a
							className="App-link"
							href="https://reactjs.org"
							target="_blank"
							rel="noopener noreferrer"
						>
							Learn React
						</a>
					</header>
				</div>
			);
		} else {
			return (
				<div>
					<button onClick={e => this.change(e)}>12</button>
					<h1>{this.state.name}</h1>
				</div>
			);
		}
	}
}

export default App;
