import { useEffect } from 'react'
import AlertBox from '../components/AlertBox'
import CourseHeader from '../components/CourseHeader'
import DatasetCard from '../components/DatasetCard'
import KeyIdea from '../components/KeyIdea'
import ScreenNavigation from '../components/ScreenNavigation'
import TaskBlock from '../components/TaskBlock'

const contextNotes = [
  {
    title: 'Где взять признаки',
    text: 'Оба признака на этом экране берутся из уже знакомого `California Housing`: `AveRooms` и `MedInc`. Новый датасет подключать не нужно.',
  },
  {
    title: 'Связь с прошлыми практиками',
    text: '`MedInc` — это тот самый доходный признак, который уже использовался в Практике 1 на экране Лаб 1.1 и в Практике 2 на экране Лаб 2.1.',
  },
]

const datasetCode = `from sklearn.datasets import fetch_california_housing
import pandas as pd
import numpy as np

data = fetch_california_housing()
df = pd.DataFrame(data.data, columns=data.feature_names)

# Блок А: второй непрерывный признак из того же датасета
task2_data = df['AveRooms'].dropna().to_numpy()

# Блок Б: среднедушевые доходы из уже знакомого признака
income_data = df['MedInc'].dropna().to_numpy()
log_income = np.log(income_data)`

const taskItems = [
  {
    title: 'Блок А. Задание 2 лабораторной работы № 1',
    content: [
      'Возьмите признак `AveRooms` из `California Housing`.',
      'Для `AveRooms` обоснуйте гипотезу о виде распределения: нормальное, равномерное или логнормальное.',
      'Проверьте выбранную гипотезу на уровне значимости 0.05 по критериям Пирсона, омега-квадрат Крамера-Мизеса-Смирнова и Жарке-Бера.',
    ],
  },
  {
    title: 'Блок Б. Среднедушевые доходы',
    content: [
      'В качестве признака “среднедушевые доходы” используйте `MedInc`.',
      'Для `MedInc` сформулируйте гипотезу о логарифмически нормальном распределении.',
      'Проверьте эту гипотезу по критериям хи-квадрат и омега-квадрат.',
      'Поясните, почему логнормальная модель содержательно выглядит здесь разумно.',
    ],
  },
  {
    title: 'Итоговое сравнение',
    content: [
      'Сравните результаты критериев внутри блока А и внутри блока Б.',
      'Отдельно напишите, где логнормальность выглядит убедительнее: у `AveRooms` или у `MedInc`.',
    ],
  },
]

function Practice3_Screen9({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 3 -> ЛАБОРАТОРНАЯ РАБОТА"
        title="Лаб 2.4. AveRooms и MedInc"
        subtitle="Продолжаем работу с непрерывными признаками на том же California Housing."
      />

      <section className="content-block space-y-6">
        <DatasetCard
          title="Конкретные данные для Лаб 2.4"
          text="На этом экране оба блока завязаны на уже знакомый `California Housing`: `AveRooms` играет роль второго непрерывного признака, а `MedInc` — кейса по доходам. Это напрямую продолжает материал Практик 1 и 2."
          code={datasetCode}
          codeTitle="Python: подготовка данных для Лаб 2.4"
        />

        <TaskBlock title="Что нужно сделать в Лаб 2.4:" items={taskItems} />

        <AlertBox title="Почему MedInc удобно проверять на логнормальность">
          <p>
            `MedInc` принимает только положительные значения и обычно имеет заметный правый хвост.
            Это типичная картина для доходных признаков: после логарифмирования форма распределения
            часто становится существенно ближе к нормальной.
          </p>
        </AlertBox>

        <KeyIdea title="Не смешивайте выводы двух блоков">
          Несмотря на общий источник данных, в отчете лучше оформить `AveRooms` и `MedInc` как два
          самостоятельных раздела с отдельными формулировками $H_0$ и отдельными итогами по
          критериям согласия.
        </KeyIdea>
      </section>

      <ScreenNavigation
        prevTo="/practice/3/screen/8"
        nextTo="/practice/3/screen/10"
        nextLabel="Далее: 10. Лаб 2.5. Tips size"
      />
    </article>
  )
}

export default Practice3_Screen9
