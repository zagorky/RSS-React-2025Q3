import { Component } from 'react';

import type { DataItem } from '../../../../types/types';

import { fetchRequest } from '../../../../api/api';
import { Loader } from '../../../../common-ui/loader/loader';
import { ErrorFallback } from '../../../../components/error-fallback';
import { normalizeError } from '../../../../utils/utilities';
import { EmptyList } from '../empty-list/empty-list';
import { ResultItem } from './result-item';

type Props = {
  searchQuery: string;
};

type State = {
  results: DataItem[];
  loading: boolean;
  error: string | null;
};

export class ResultsSection extends Component<Props, State> {
  state: State = {
    results: [],
    loading: false,
    error: null,
  };

  async fetchData(query: string) {
    this.setState({ loading: true, error: null });

    try {
      const data = await fetchRequest(query);
      this.setState({
        results: data.data ?? [],
        loading: false,
        error: null,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: normalizeError(error),
      });
    }
  }

  componentDidMount() {
    this.fetchData(this.props.searchQuery);
  }

  componentDidUpdate(previousProps: Readonly<Props>) {
    if (previousProps.searchQuery !== this.props.searchQuery) {
      this.fetchData(this.props.searchQuery);
    }
  }

  render() {
    const { loading, error, results } = this.state;
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return <ErrorFallback />;
    }
    if (!results) {
      return <EmptyList />;
    }
    if (results.length === 0) {
      return <EmptyList />;
    }

    return (
      <section>
        <ul className="result-section">
          {results.map((result) => (
            <ResultItem key={result.title_english} data={result} />
          ))}
        </ul>
      </section>
    );
  }
}
