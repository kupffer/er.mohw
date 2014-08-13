/*! grafana - v1.7.0 - 2014-08-14
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

define(["services/graphite/gfunc"],function(a){describe("when creating func instance from func names",function(){it("should return func instance",function(){var b=a.createFuncInstance("sumSeries");expect(b).to.be.ok(),expect(b.def.name).to.equal("sumSeries"),expect(b.def.params.length).to.equal(0),expect(b.def.defaultParams.length).to.equal(0),expect(b.def.defaultParams.length).to.equal(0)}),it("should return func instance with shortName",function(){var b=a.createFuncInstance("sum");expect(b).to.be.ok()}),it("should return func instance from funcDef",function(){var b=a.createFuncInstance("sum"),c=a.createFuncInstance(b.def);expect(c).to.be.ok()}),it("func instance should have text representation",function(){var b=a.createFuncInstance("groupByNode");b.params[0]=5,b.params[1]="avg",b.updateText(),expect(b.text).to.equal("groupByNode(5, avg)")})}),describe("when rendering func instance",function(){it("should handle single metric param",function(){var b=a.createFuncInstance("sumSeries");expect(b.render("hello.metric")).to.equal("sumSeries(hello.metric)")}),it("should handle metric param and int param and string param",function(){var b=a.createFuncInstance("groupByNode");b.params[0]=5,b.params[1]="avg",expect(b.render("hello.metric")).to.equal("groupByNode(hello.metric,5,'avg')")}),it("should handle function with no metric param",function(){var b=a.createFuncInstance("randomWalk");b.params[0]="test",expect(b.render(void 0)).to.equal("randomWalk('test')")})}),describe("when requesting function categories",function(){it("should return function categories",function(){var b=a.getCategories();expect(b.Special.length).to.be.greaterThan(8)})}),describe("when updating func param",function(){it("should update param value and update text representation",function(){var b=a.createFuncInstance("summarize");b.updateParam("1h",0),expect(b.params[0]).to.be("1h"),expect(b.text).to.be("summarize(1h, sum)")}),it("should parse numbers as float",function(){var b=a.createFuncInstance("scale");b.updateParam("0.001",0),expect(b.params[0]).to.be(.001)})}),describe("when updating func param with optional second parameter",function(){it("should update value and text",function(){var b=a.createFuncInstance("aliasByNode");b.updateParam("1",0),expect(b.params[0]).to.be(1)}),it("should slit text and put value in second param",function(){var b=a.createFuncInstance("aliasByNode");b.updateParam("4,-5",0),expect(b.params[0]).to.be(4),expect(b.params[1]).to.be(-5),expect(b.text).to.be("aliasByNode(4, -5)")}),it("should remove second param when empty string is set",function(){var b=a.createFuncInstance("aliasByNode");b.updateParam("4,-5",0),b.updateParam("",1),expect(b.params[0]).to.be(4),expect(b.params[1]).to.be(void 0),expect(b.text).to.be("aliasByNode(4)")})})});