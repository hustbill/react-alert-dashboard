var React = require('react');
var Ball =  require('./Ball');
var Store = require('./store');


class Cell extends  React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.Onchange = this.Onchange.bind(this);
    }    

    shouldComonentUpdate(newProps, newState) {
        var oldCell = this.props.cell;
        var newCell = newProps.cell;

        return ( 
            oldCell.value !== newCell.value ||
            oldCell.editable !== newCell.editable ||
            oldCell.editable !== newCell.hasConflict
        );
    }

    render() {
        var cell = this.props.cell;
        var classes = [];
        classes.push('i' + cell.i);
        classes.push('j' + cell.j);

        return (
            <div>
            <td className={classes.join(' ')}>
                <input  
                    type="tel"
                    value={cell.value}
                    onClick={this.onClick}
                    onChange={this.onChange} 
                />
            </td>
            <p>
                byte dance now
            </p>
            </div>
        );
    }

    onClick(event) {
        event.preventDefault();
        if (this.props.cell.editable) {
            event.target.select();
        } else {
            event.target.blur();
        }
    }

    onChange(event) {
        event.preventDefault();
        var cell = this.props.cell;
        if (!cell.editable) {
            return;
        }
        var newValue = event.target.value;
        if (newValue !== '' && !/^[1-9]$/.test(newValue)) {
            event.target.value = cell.value;
            return;
        }
        Store.dispatch({
            type: 'CHANGE_VALUE',
            i: cell.i,
            j: cell.j,
            value: newValue === '' ? null : parseInt(newValue)
        });
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = Store.getState();
    }

    componentDidMount() {
        var self = this;
        this.unsubscribe = Store.subscribe(function () {
            self.setState(Store.getState());
        });

        this.addSecond = setInterval(function () {
            Store.dispatch({ type: 'ADD_SECOND' });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.addSecond);
        this.unsubscribe();
    }

    render() {
        return (
            <div>
                <textarea name="textAread1" id="" cols="30" rows="10">
                    show byte dance!
                </textarea>
                <table className="sudoku-table">
                    <tbody>
                        {this.state.game.cells.map(function (line, i) {
                            return (
                                <tr key={i}>
                                    {line.map(function (cell) {
                                        return <Cell cell={cell} key={cell.j} />;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {/* <Controls /> */}
            </div>
        );
    }
}

module.exports = Game;