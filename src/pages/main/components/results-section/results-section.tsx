import type { DataItem } from '~types/types';

import { fetchRequest } from '~api/api';
import { ErrorFallback } from '~components/error-fallback/error-fallback';
import { Loader } from '~components/loader/loader';
import { normalizeError, withDataTestId } from '~utils/utilities';
import { Component } from 'react';

import { EmptyList } from '../empty-list/empty-list';
import { ResultItem } from './result-item';

type ResultSectionProps = {
  searchQuery: string;
};

type ResultSectionState = {
  results: DataItem[];
  loading: boolean;
  error: string | null;
};

export class ResultsSection extends Component<
  ResultSectionProps,
  ResultSectionState
> {
  state: ResultSectionState = {
    results: [],
    loading: false,
    error: null,
  };

  private abortController: AbortController | null = null;

  async fetchData(query: string) {
    if (this.abortController) {
      this.abortController.abort();
    }

    this.abortController = new AbortController();
    const { signal } = this.abortController;

    try {
      this.setState({ loading: true, error: null });
      const data = await fetchRequest(query, signal);
      if (!signal.aborted) {
        this.setState({
          results: data.data ?? [],
          loading: false,
          error: null,
        });
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }
      this.setState({
        loading: false,
        error: normalizeError(error),
      });
    } finally {
      this.abortController = null;
    }
  }

  componentDidMount() {
    this.fetchData(this.props.searchQuery);
  }

  componentDidUpdate(previousProps: Readonly<ResultSectionProps>) {
    if (previousProps.searchQuery !== this.props.searchQuery) {
      this.fetchData(this.props.searchQuery);
    }
  }

  componentWillUnmount() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }

  render() {
    const { loading, error, results } = this.state;
    if (loading) {
      return <Loader />;
    }

    if (error) {
      return <ErrorFallback error={error} />;
    }

    if (results.length === 0) {
      return <EmptyList />;
    }

    return (
      <section className="flex items-center justify-center">
        <ul {...withDataTestId('result-list')} className="result-section">
          {results.map((result, i) => (
            <ResultItem key={result.mal_id + 'and' + i} data={result} />
          ))}
        </ul>
      </section>
    );
  }
}
