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
    text: 'В лабораторной работе 2.4 используются признаки `AveRooms` и `MedInc` из датасета `California Housing`.',
  },
  {
    title: 'Логарифмирование доходов',
    text: 'Для проверки гипотезы о логарифмически нормальном распределении признака `MedInc` следует рассматривать величину `log_income = \\ln(MedInc)`.',
  },
]

const datasetCode = `from sklearn.datasets import fetch_california_housing
import pandas as pd
import numpy as np

data = fetch_california_housing()
df = pd.DataFrame(data.data, columns=data.feature_names)

task2_data = df['AveRooms'].dropna().to_numpy()

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
        subtitle="Проверка гипотез о распределении для двух непрерывных признаков датасета California Housing."
      />

      <section className="content-block space-y-6">
        <DatasetCard
          title="Конкретные данные для Лаб 2.4"
          text="В лабораторной работе 2.4 используются два признака датасета `California Housing`: `AveRooms` и `MedInc`."
          code={datasetCode}
          codeTitle="Python: подготовка данных для Лаб 2.4"
        />

        <TaskBlock title="Что нужно сделать в Лаб 2.4:" items={taskItems} />

        <AlertBox title="Почему MedInc удобно проверять на логнормальность">
          <p>
            Признак `MedInc` принимает только положительные значения и, как правило, характеризуется
            выраженной правосторонней асимметрией. Для подобных экономических показателей
            логарифмирование нередко приводит распределение к форме, близкой к нормальной.
          </p>
        </AlertBox>

        <KeyIdea title="Не смешивайте выводы двух блоков">
          В отчете целесообразно оформить анализ признаков `AveRooms` и `MedInc` как два
          самостоятельных раздела с отдельными формулировками $H_0$ и отдельными выводами по
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
