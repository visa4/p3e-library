import 'mocha';
import { expect } from 'chai';
import {PropertyHydrator} from "../../src/hydrator/PropertyHydrator";
import {PropertyStrategyInterface} from "../../src/hydrator/strategy/proprerty/PropertyStrategyInterface";
import {ValueStrategyInteface} from "../../src/hydrator/strategy/value/ValueStrategyInteface";

describe('PropertyHydrator', () => {

    it('Constructor', () => {
        const hydrator = new PropertyHydrator();
        expect(hydrator).to.instanceOf(PropertyHydrator);
        expect(hydrator).to.to.have.property('templateObjectHydration');
        expect(hydrator).to.to.have.property('valueStrategies');
        expect(hydrator).to.to.have.property('propertyStrategies');
        expect(hydrator).to.to.have.property('enablePropertyToHydrate');
        expect(hydrator).to.to.have.property('enablePropertyToExtract');
    });

    it('Value Strategy', () => {
        const hydrator = new PropertyHydrator();
        let mock = <ValueStrategyInteface>{};
        expect(hydrator.getValueStrategy('test')).to.be.a('undefined');
        expect(hydrator.hasValueStrategy('test')).to.be.false;
        expect(hydrator.addValueStrategy('test', mock)).to.instanceOf(PropertyHydrator);
        expect(hydrator.getValueStrategy('test')).to.equal(mock);
        expect(hydrator.removeValueStrategy('test')).to.instanceOf(PropertyHydrator);
        expect(hydrator.hasValueStrategy('test')).to.be.false;
    });

    it('Property Strategy', () => {
        const hydrator = new PropertyHydrator();
        let mock = <PropertyStrategyInterface>{};
        expect(hydrator.getPropertyStrategy('test')).to.be.a('undefined');
        expect(hydrator.hasPropertytrategy('test')).to.be.false;
        expect(hydrator.addPropertyStrategy('test', mock)).to.instanceOf(PropertyHydrator);
        expect(hydrator.getPropertyStrategy('test')).to.equal(mock);
        expect(hydrator.removePropertyStrategy('test')).to.instanceOf(PropertyHydrator);
        expect(hydrator.hasPropertytrategy('test')).to.be.false;
    });


    it('Skip end Enable Property/Value', () => {
        let hydrator;
        hydrator = new PropertyHydrator();

        expect(hydrator.skipPropertyToExtract('test')).to.be.false;
        expect(hydrator.skipPropertyToHydrate('test')).to.be.false;

        expect(hydrator.enableHydrateProperty('test1')).to.instanceOf(PropertyHydrator);
        expect(hydrator.enableExtractProperty('test1')).to.instanceOf(PropertyHydrator);

        expect(hydrator.skipPropertyToExtract('test')).to.be.true;
        expect(hydrator.skipPropertyToHydrate('test')).to.be.true;
        expect(hydrator.skipPropertyToExtract('test1')).to.be.false;
        expect(hydrator.skipPropertyToHydrate('test1')).to.be.false;

    });

});
