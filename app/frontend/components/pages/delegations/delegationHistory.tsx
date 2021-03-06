import {h} from 'preact'
import printAda from '../../../helpers/printAda'
import actions from '../../../actions'
import {connect} from '../../../libs/unistore/preact'

const DelegationHistory = ({delegationHistory}) => {
  return (
    <div className="delegation-history card">
      <h2 className="card-title">Delegation history</h2>
      {delegationHistory.length === 0 ? (
        <div className="delegation-history-empty">No delegations found</div>
      ) : (
        <ul className="delegation-history-content">
          {delegationHistory.map((entry, i) => (
            <li key={i} className="delegation-history-item">
              <div className="delegation-history-time">{entry.timeIssued}</div>
              <div className={`delegation-history-title ${entry.entryType}`}>{entry.entryType}</div>
              {entry.entryType === 'delegation' ? (
                entry.stakePools.map((pool, i) => [
                  <div key={i} className="delegation-history-name">
                    {pool.name}
                  </div>,
                  <div key={i} className="delegation-history-percent">{`${pool.ratio} %`}</div>,
                  <div key={i} className="delegation-history-id">
                    {pool.id}
                  </div>,
                  <div key={i} />,
                ])
              ) : entry.entryType === 'reward' ? (
                [
                  <div key={i} className="delegation-history-reward-info">
                    {entry.info}
                  </div>,
                  <div key={i} className="delegation-history-amount">
                    {printAda(entry.amount)}
                  </div>,
                ]
              ) : (
                <div />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default connect(
  (state) => ({
    delegationHistory: state.delegationHistory,
  }),
  actions
)(DelegationHistory)
