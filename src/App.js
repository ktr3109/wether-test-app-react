//Formから移設
import { useState } from "react";//reactからStateを読み込ませる記述
import axios from "axios";//APIコールをするためのパッケージ

import Title from './components/Title';//APPの枠の中にタイトル要素を追加
import Form from './components/Form';
import Results from './components/Results';
import './App.css';

function App() {
  //上位コンポーネントAPPにデータを移設
  const [city, setCity] = useState("");//react内でのデータの一時保存場所
  const [results, setResults] = useState({//気象データを保管する場所
    country: "",
    cityName: "",
    temperature: "",
    conditionText: "",
    icon: ""
  });
  const getWeather = (e) => {
      e.preventDefault();//リロードを止める。イベント・パラメーター(e)から呼び出し
      axios.get(`http://api.weatherapi.com/v1/current.json?key=702ef6ddd8024a179c8105943232107&q=${city}&aqi=no`)//都市名データを受けとれるようになる。
          .then(res => {
            setResults({//APIの中を確認。入れ子構造に沿う形でdataから.をつけて記述
              country: res.data.location.country,
              cityName: res.data.location.name,
              temperature: res.data.current.temp_c,
              conditionText: res.data.current.condition.text,
              icon:res.data.current.condition.icon
            })
          })//resはresponseの略。APIから送り返された気象データが入っている。
  }
  return (
    <div className="wrapper">
      <div className="container">
        <Title />{/* 実際にタイトル要素を追加 */}
        <Form setCity={setCity} getWeather={getWeather} />{/* propsを使用してFormにデータを送る */}
        <Results results={results} />
      </div>
    </div>
  );
}

export default App;
