'use strict';
const chalk = require('chalk');
const _ = require('lodash');
const figlet = require('figlet');
const Generator = require('yeoman-generator');
const printMessage = require('print-message');

module.exports = class extends Generator {
  prompting() {
    this.log(`👋 Welcome to the ${chalk.magenta("Ashish Patel's")} generator!`);

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the file?',
        validate: input => {
          return input.length > 0 ? true : 'Filename contains no characters.';
        },
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      props.problemName = props.name;
      const nameHasHyphen = props.name.indexOf('-');
      if (nameHasHyphen !== -1) {
        const splitArr = props.name.split(/-(.+)/);
        if (splitArr[0] && splitArr[0].match(/^[0-9]+$/) !== null) {
          const title =
            splitArr[1] &&
            splitArr[1]
              .split('-')
              .join(' ')
              .replace(/\.[^/.]+$/, '');
          props.problemName = title;
        } else {
          props.problemName = props.name;
        }
      } else {
        props.problemName = props.name;
      }
      this.props = props;
    });
  }

  _copy(props, fileExtension) {
    this.fs.copyTpl(
      this.templatePath('Javaproblem.' + fileExtension + '.ejs'),
      this.destinationPath('./' + props.name + '.' + fileExtension),
      props
    );
  }

  writing() {
    this._copy(this.props, 'java');
  }

  end() {
    this.log(`${chalk.magenta(figlet.textSync('Ashish'))}`);
    this.log(`${chalk.magenta(figlet.textSync('Patel'))}`);
    printMessage(['Project files created'], {
      border: true,
      color: 'magenta',
      borderColor: 'magenta',
      marginTop: 1,
      marginBottom: 1,
      paddingTop: 1,
      paddingBottom: 1,
    });
  }
};
