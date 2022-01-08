export type operator = '+' | '-' | '*' | '/';
export type other_actions = '=' | 'ac' | 'c';
export const operatorRegex = new RegExp(/^[\\*\\+\-\\/]{1}$/);

export default class Calculator {
  public results_list: (operator | number)[] = [];
  public onchange: () => void = () => undefined;

  protected get_first_result_item = () => this.results_list[0];
  protected get_last_result_item = () =>
    this.results_list[this.results_list.length - 1];

  private add_base(action: operator | other_actions | number) {
    const lri = this.get_last_result_item();

    // If new action is other actions: Return Undefiend
    if (action === '=' || action === 'ac' || action === 'c') {
      return undefined;
    }

    // If Last Item in List is Operator and new action is Operator: Return Undefiend
    if (operatorRegex.test(String(lri)) && operatorRegex.test(String(action))) {
      this.results_list.pop();
    }

    // If Last Item in List is not Number (means Operator or Null) and new action is Operator: Return Undefiend
    if (typeof lri === 'undefined' && operatorRegex.test(String(action))) {
      return undefined;
    }

    /* 
    If Last Item in List is Number and new action is Number: return Last Item + new action
    e.g: 5 + 5 = 55
     */
    if (typeof action === 'number' && typeof lri === 'number') {
      this.results_list.pop();
      this.results_list.push(Number(String(lri) + String(action)));

      return this.results_list;
    }

    this.results_list.push(action);

    return this.results_list;
  }

  public add(action: operator | other_actions | number) {
    this.add_base(action);

    this.onchange();

    return this.results_list;
  }

  public addBulk(...action: (operator | other_actions | number)[]) {
    action.forEach((item) => {
      this.add_base(item);
    });

    this.onchange();

    return this.results_list;
  }

  public submit() {
    const lri = this.get_last_result_item();
    console.log(this.results_list);

    /* If Last Item in List is Operator And Click on GetResult(=) Return Undefind */
    if (operatorRegex.test(String(lri))) {
      return undefined;
    }

    this.results_list = [Function(`return ${this.results_list.join(' ')}`)()];

    this.onchange();

    return this.results_list;
  }

  /* Convert operator value to label */
  public get_results_list(): (number | operator | '×' | '÷')[] {
    return this.results_list.map((item) => {
      switch (true) {
        case item === '*':
          return '×';

        case item === '/':
          return '÷';

        default:
          return item;
      }
    });
  }

  public clear() {
    this.results_list.pop();

    this.onchange();

    return this.results_list;
  }

  public clearAll() {
    this.results_list = [];

    this.onchange();

    return this.results_list;
  }
}
