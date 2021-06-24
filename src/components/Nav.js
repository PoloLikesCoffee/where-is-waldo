import React from 'react';

const Nav = ({ startGame, showHighscore, timer }) => {
	const renderTime = (totalSeconds) => {
		const hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;
		return (
			hours.toString().padStart(2, '0') +
			':' +
			minutes.toString().padStart(2, '0') +
			':' +
			seconds.toString().padStart(2, '0')
		);
	};

	return (
		<nav>
			<h1>Where are Kirby and Co?</h1>
			<h1 className="start-btn" onClick={(event) => startGame(event)}>
				Start Game
			</h1>
			<h1 className="highscore-btn" onClick={(event) => showHighscore(event)}>
				Highscores
			</h1>
			<div className="timer">Timer: {renderTime(timer)}</div>
		</nav>
	);
};

export default Nav;
