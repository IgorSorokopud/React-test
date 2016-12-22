var my_news = [
    {
        author: 'Саша Печкин',
        text: 'В четчерг, четвертого числа...',
        bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
    },
    {
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 35 рублей!',
        bigText: 'А евро 42!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
        bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
    }
];

var Article = React.createClass({

    getInitialState: function () {
        return {
            visible: false
        }
    },

    readmoreClick: function (e) {
        e.preventDefault();
        this.setState({visible: true});
    },

    propTypes: {
        data: React.PropTypes.shape({
            author: React.PropTypes.string.isRequired,
            text: React.PropTypes.string.isRequired
        })
    },

    render: function () {
        var author = this.props.data.author;
        var text = this.props.data.text;
        var bigText = this.props.data.bigText;
        var visible = this.state.visible;

        return (
            <div className='article'>
                <p className='news__author'>{author}:</p>
                <p className='news__text'>{text}</p>
                <a href="#" onClick={this.readmoreClick} className={'news__readmore ' + (visible ? 'none': '')}>Подробнее</a>
                <p className={'news__big-text ' + (visible ? '': 'none')}>{bigText}</p>
            </div>
        );
    }
})

var News = React.createClass({

    getInitialState: function () {
        return {
            counter: 0
        }
    },

    propTypes: {
        data: React.PropTypes.array.isRequired
    },

    counterClick: function () {
        this.setState({couter: ++this.state.counter});
    },

    render: function () {
        var data = this.props.data;

        if (data.length > 0) {
            var newsTemplate = data.map(function (item, index) {
                return (
                    <div key={index}>
                        <Article data={item}/>
                    </div>
                )
            })
        } else {
            newsTemplate = <p>К сожалению новостей нет</p>
        }

        return (
            <div className="news">
                {newsTemplate}
                <strong className={'news__count ' + (data.length > 0 ? '':'none')}
                        onClick={this.counterClick}
                >Всего новостей: {data.length}</strong>
            </div>
        );
    }
});

var Add = React.createClass({
    getInitialState: function() { //устанавливаем начальное состояние (state)
        return {
            agreeNotChecked: true,
            authorIsEmpty: true,
            textIsEmpty: true
        };
    },
    componentDidMount: function () {
        ReactDOM.findDOMNode(this.refs.author).focus();
    },
    onBtnClickHandler: function (e) {
        e.preventDefault();

        var author = ReactDOM.findDOMNode(this.refs.author).value;
        var text = ReactDOM.findDOMNode(this.refs.text).value;

        alert(author + "    " + text)
    },
    onCheckRuleClick: function (e) {
        this.setState({agreeNotChecked: !this.state.agreeNotChecked});
    },

    changState: function(inputName, e) {
        if (e.target.value.trim().length > 0) {
            this.setState({[''+inputName]:false})
        } else {
            this.setState({[''+inputName]:true})
        }
    },

    render: function () {
        return (
            <form className='add cf'>
                <input
                    type='text'
                    className='add__author'
                    defaultValue=''
                    placeholder='Ваше имя'
                    ref='author'
                    onChange={this.changState.bind(this, 'authorIsEmpty')}
                />
                <textarea
                    className='add__text'
                    defaultValue=''
                    placeholder='Текст новости'
                    ref='text'
                    onChange={this.changState.bind(this, 'textIsEmpty')}
                ></textarea>
                <label className='add__checkrule'>
                    <input type='checkbox' ref='checkrule' onChange={this.onCheckRuleClick}/>Я согласен с правилами
                </label>

                <button
                    className='add__btn'
                    onClick={this.onBtnClickHandler}
                    ref='alert_button'
                    disabled={this.state.agreeNotChecked || this.state.authorIsEmpty || this.state.textIsEmpty}
                >
                    Показать alert
                </button>
            </form>
        );
    }
});

var App = React.createClass({
    render: function () {
        return (
            <div className="app">
                <Add />
                <h3>Новости</h3>
                <News data={my_news}/>
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);