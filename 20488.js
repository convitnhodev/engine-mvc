module.exports = {
    render: function (template, data) {
      template = this.replaceVariables(template, data);
  
      return template;
    },
  
    replaceVariables: function (template, data) {
      try {
        return template.replace(/20488{(.*?)}/g, (match, variable) => {
          if (data[variable] !== undefined) {
            return data[variable];
          }
  
          if (variable.startsWith("if ")) {
            const condition = variable.slice(3).trim();
            return this.evaluateCondition(condition, data) ? "true" : "false";
          }
  
          return this.evaluateExpression(variable, data);
        });
      } catch (e) {
        console.error("Error during variable replacement:", e);
        return template;
      }
    },
    evalCondition: function (condition, variables) {
      return eval(
        condition.replace(
          /\b([a-zA-Z_][a-zA-Z0-9_]*)\b/g,
          (_, name) => variables[name] || "false"
        )
      );
    },
    evaluateExpression: function (expression, variables) {
      return eval(
        expression.replace(
          /\b([a-zA-Z_][a-zA-Z0-9_]*)\b/g,
          (_, name) => variables[name] || 0
        )
      );
    },
  };