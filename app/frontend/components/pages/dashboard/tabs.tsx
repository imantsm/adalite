import {h} from 'preact'

export const MainTab = ({name, selectedTab, selectTab}) => {
  return (
    <li className="main-tab">
      <input type="radio" id={name} name="tabs" onClick={() => selectTab(name)} />
      <label className={name === selectedTab ? 'selected' : ''} htmlFor={name}>
        {name}
      </label>
    </li>
  )
}

export const SubTab = ({name, selectedTab, selectTab}) => (
  <li
    className={`dashboard-tab ${name === selectedTab ? 'selected' : ''}`}
    onClick={() => selectTab(name)}
  >
    {name}
  </li>
)
