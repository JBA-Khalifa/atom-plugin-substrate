import * as React from "react";
import { CompositeDisposable } from "atom";
import { Menu as MenuType, remote } from "electron";
import { connect } from "react-redux";

import { NodeComponent } from "../../components/nodes";
import { AppState } from "../../store";
import { TabsState } from "../../store/modules/tabs/types";
import { togglePanel } from "../../store/modules/tabs/actions";

const { Menu, MenuItem } = remote;

export type Props = {
  id: number,
  tabs: TabsState,
  togglePanel: typeof togglePanel,
};

type State = {
  menu: MenuType,
};

class NodesBodyPanel extends React.Component<Props, State> {
  public state: State = {
    menu: new Menu(),
  };
  private subscriptions = new CompositeDisposable();

  componentDidMount() {
    this.initMenu();
  }

  public render(): JSX.Element {
    const val = this.props.tabs.panels.find(
      (value) => value.id === this.props.id,
    );
    if (!val) {
      return <span>Invalid tabs</span>;
    }
    const onButtonClick = (_event: React.MouseEvent) => {
      this.props.togglePanel(val.id);
    };
    const isClosed = val.closed ? "closed" : "";
    const className = `tab ${isClosed}`;
    return (
      <div className={className}>
        <div className="tab-label" onClick={onButtonClick}>
          <span>{val.title}</span>
          <div className="actions" onClick={console.log}>• • •</div>
        </div>
        <div className="tab-content">
          <ul className="nodes">
            <NodeComponent name={"Default"} url={"ws://127.0.0.1:9944"} />
            <NodeComponent name={"Example"} url={"wss://poc3.example.com"} />
          </ul>
        </div>
      </div>
    );
  }

  private initMenu() {
    const menu = this.state.menu;
    menu.append(new MenuItem({
      label: 'Add node',
      click: () => console.log(1),
      enabled: true,
    }));
    menu.append(new MenuItem({
      label: 'Start local node',
      click: () => console.log(2),
      enabled: true,
    }));
    menu.append(new MenuItem({
      label: 'Stop local node',
      click: () => console.log(3),
      enabled: true,
    }));
    menu.append(new MenuItem({
      label: 'Clear chain data',
      click: () => console.log(4),
      enabled: true,
    }));
    menu.append(new MenuItem({
      label: 'Disconnect from node',
      click: () => console.log(5),
      enabled: true,
    }));
    menu.append(new MenuItem({
      label: 'Edit types',
      click: () => console.log(6),
      enabled: true,
    }));
    this.setState({ menu });
  }
}

const mapStateToProps = (state: AppState) => ({
  tabs: state.tabs,
});

export default connect(
  mapStateToProps,
  { togglePanel }
)(NodesBodyPanel);
