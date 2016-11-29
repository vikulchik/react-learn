const myNews = [
    {
        author: 'Саша Печкин',
        text: 'Без учета мнения специалистов и общественности относительно внешнего вида здания, театр на Подоле не будет сдан в эксплуатацию.'
    },
    {
        author: 'Саша',
        text: 'Без учета мнения специалистов и согласования с общественностью, это здание не будет сдано в эксплуатацию.'
    },
    {
        author: 'Василий',
        text: 'Мэр отметил, что подрядчик не учел рекомендаций градостроительного совета'
    }
];

class News extends React.Component {
    render() {
        const data = this.props.data;
        let newsTemplate;
        if (data.length){
            newsTemplate= data.map((item, index) => {
                return (
                    <div key={index} className="news-block">
                        <p className="news-author"> {item.author}</p>
                        <p className="news-text"> {item.text}</p>
                    </div>
                )
            });
        } else {
            newsTemplate = <p className="news-no">К сожалению новостей нету</p>
        }

        return (
            <div className="news">
                <strong>Всего новостей: {data.length}</strong>
                {newsTemplate}
            </div>
        )
    }
}

class App extends  React.Component {
    render() {
        return (
            <div className="app">
                Обновление новостей
                <News data={myNews}/>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);

