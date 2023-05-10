const sounds = [
    {
        key: 'Q',
        mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
        color: "#8A496B",
        note: "Heater-1"
    },
    {
        key: 'W',
        mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
        color: "#20B2AA",
        note: "Heater-2"
    },
    {
        key: 'E',
        mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
        color: "#C8AD7F",
        note: "Heater-3"
    },
    {
        key: 'A',
        mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
        color: "#4169E1",
        note: "Heater-4"
    },
    {
        key: 'S',
        mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
        color: "#90EE90",
        note: "Calp"
    },
    {
        key: 'D',
        mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
        color: "#9B5094",
        note: "Open HH"
    },
    {
        key: 'Z',
        mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
        color: "#39A0ED",
        note: "Kick-n'-Hat"
    },
    {
        key: 'X',
        mp3: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
        color: "#F49F0A",
        note: "Kick"
    },
    {
        key: 'C',
        mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
        color: "#FF495C",
        note: "Closed HH"
    },
];

const App = () => {
    return (
        <div className="" id="display">
            <div className="" id="wrapper">
                <h3 class="py-4 text-center" id="control-pad">Play a Sound</h3>
                {sounds.map((letter, index) => (
                    <Box text={letter.key} index={index} color={letter.color} audio={letter.mp3} name={letter.note} />))}
            </div>

        </div>
    )
}

class Box extends React.Component {
    constructor(props) {
        super(props)
        this.audio = React.createRef()
    }

    playSound = () => {
        this.audio.current.play();
        let click = this.audio.current.parentNode;
        click.classList.add("active")
        const change = click.parentNode;
        change.querySelector("#control-pad").innerText = `${this.props.name}`
    }

    componentDidMount = () => {
        this.audio.current.addEventListener("ended", (e) => {
            const finished = e.target.parentNode;
            finished.classList.remove("active");
        })
    }

    render() {
        return (
            <div onClick={this.playSound} className="drum-pad" style={{ border: `1px solid ${this.props.color}`,
            boxShadow: `0px 15px 24px -14px ${this.props.color}, inset 0px -15px 24px -14px ${this.props.color}` }}>
                {this.props.text}
                <audio class="clip" id={this.props.text} ref={this.audio} src={this.props.audio}> </audio>
            </div>
        )
    }
}


document.addEventListener('keydown', (e) => {
    const cd = e.key.toUpperCase();
    const audio = document.getElementById(cd);

    if (audio) {
        audio.currentTime = 0;
        const parent = audio.parentNode;
        parent.classList.add('active');
        console.log(audio)
        const display = parent.parentNode;
        display.querySelector('#control-pad').innerText = `${cd} is playing`;
        audio.play();
    }
});


ReactDOM.render(<App />, document.getElementById("drum-machine"));