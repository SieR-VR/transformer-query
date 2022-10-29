import ts from "typescript";
import { TokenData } from "../Tokenizer";
import * as SyntaxKind from "../Tokenizer/SyntaxKind";

export interface Node {
    data: ts.Node;
    sourceFile: ts.SourceFile;

    getSourceFile(): ts.SourceFile;
    getChildCount(): number;
    getStart(includeJsDocComment?: boolean): number;
    getFullStart(): number;
    getEnd(): number;
    getWidth(): number;
    getFullWidth(): number;
    getLeadingTriviaWidth(): number;
    getFullText(): string;
}

export interface HelperNode<Children extends Node[], Text extends string> {
    text: Text;
    getChildAt<I extends number>(index: I): Children[I];
    getChildren(): Children;
    getText(): Text;
}


export interface Token<
    Actual extends string,
    TokenKind extends SyntaxKind.TokenSyntaxKind<TokenData, Actual> =
    Actual extends keyof SyntaxKind.TokenMap<Actual, TokenData> ?
    SyntaxKind.TokenMap<Actual, TokenData>[Actual] :
    SyntaxKind.TokenSyntaxKind<TokenData, Actual>
> extends Node, HelperNode<[], Actual> {
    data: ts.Token<TokenKind["kind"]>;
}

export interface EndOfFileToken extends Token<""> {
    data: ts.EndOfFileToken;
}

export interface PunctuationToken<
    Actual extends keyof SyntaxKind.PunctuationTokenMap<Actual, TokenData>,
    TokenKind extends SyntaxKind.PunctuationSyntaxKind<Actual, TokenData> = SyntaxKind.PunctuationTokenMap<Actual, TokenData>[Actual]
> extends Token<Actual, TokenKind> {
    data: ts.PunctuationToken<TokenKind["kind"]>;
}

export type DotToken = PunctuationToken<".">;
export type DotDotDotToken = PunctuationToken<"...">;
export type QuestionToken = PunctuationToken<"?">;
export type ExclamationToken = PunctuationToken<"!">;
export type ColonToken = PunctuationToken<":">;
export type EqualsToken = PunctuationToken<"=">;
export type AsteriskToken = PunctuationToken<"*">;
export type EqualsGreaterThanToken = PunctuationToken<"=>">;
export type PlusToken = PunctuationToken<"+">;
export type MinusToken = PunctuationToken<"-">;
export type QuestionDotToken = PunctuationToken<"?.">;

export interface KeywordToken<
    Actual extends keyof SyntaxKind.KeywordMap<Actual, TokenData>,
    TokenKind extends SyntaxKind.KeywordSyntaxKind<Actual, TokenData> = SyntaxKind.KeywordMap<Actual, TokenData>[Actual]
> extends Token<Actual, TokenKind> {
    data: ts.KeywordToken<TokenKind["kind"]>;
}

export type AssertsKeyword = KeywordToken<"asserts">;
export type AssertKeyword = KeywordToken<"assert">;
export type AwaitKeyword = KeywordToken<"await">;

export interface Identifier<Name extends string> extends Declaration<Name> {
    data: ts.Identifier;
    readonly text: Name;
}

export interface TransientIdentifier<Name extends string> extends Identifier<Name> {
    data: ts.TransientIdentifier;
    resolvedSymbol: ts.Symbol;
}

export interface QualifiedName<
    Left extends EntityName<any>,
    Right extends Identifier<any>
> extends Node, HelperNode<[Left, DotToken, Right], `${Left["text"]}.${Right["text"]}`> {
    data: ts.QualifiedName;
    left: Left;
    right: Right;
}

export type EntityName<Name extends string> = Identifier<Name> | QualifiedName<any, Identifier<Name>>;

export type PropertyName<Name extends string> = Identifier<Name> | StringLiteral<Name> | NumericLiteral<[], Name>;

export type MemberName<Name extends string> = Identifier<Name> | PrivateIdentifier<Name>;

type DeclarationName<Name extends string> =
    | Identifier<Name>
    | PrivateIdentifier<Name>
    | StringLiteralLike<Name>
    | NumericLiteral<[], Name>
    | ComputedPropertyName<Node>
    // | ElementAccessExpression
    | BindingPattern
    // | EntityNameExpression;

export interface Declaration<
    Name extends string, 
    Children extends Node[] = []
> extends Node, HelperNode<Children, Name> {
    data: ts.Declaration;
}

export interface NamedDeclaration<
    Name extends DeclarationName<string>,
> extends Declaration<Name["text"]> {
    data: ts.NamedDeclaration;
    name: Name;
}

export interface DeclarationStatement<
    Name extends DeclarationName<string>,
> extends Statement, HelperNode<[], Name["text"]> {
    data: ts.DeclarationStatement;
    name: Identifier<Name["text"]> | StringLiteral<Name["text"]> | NumericLiteral<[], Name["text"]> | undefined;
}

export interface ComputedPropertyName<
    Expression extends Node
> extends Node, HelperNode<[Expression], string> {
    data: ts.ComputedPropertyName;
    expression: Expression;
}

export interface PrivateIdentifier<
    Name extends string
> extends PrimaryExpression<[], Name> {
    data: ts.PrivateIdentifier;
    text: Name;
}

export interface Decorator<
    Expression extends LeftHandSideExpression<any, any>
> extends Node, HelperNode<[Expression], Expression["text"]> {
    data: ts.Decorator;
    expression: Expression;
}

export interface TypeParameterDeclaration<
    Name extends Identifier<string>,
    Constraint extends TypeNode<string> | undefined,
    Default extends TypeNode<string> | undefined,
    Expression extends Node | undefined
> extends NamedDeclaration<Name> {
    data: ts.TypeParameterDeclaration;
    name: Name;
    constraint: Constraint;
    default: Default;

    expression: Expression;
}

export interface SignatureDeclarationBase<
    Name extends PropertyName<string>,
    TypeParameters extends TypeParameterDeclaration<any, any, any, any>[] | undefined,
    Parameters extends ParameterDeclaration<any, any, any, any, any, any>[] | undefined,
    Type extends TypeNode<string> | undefined
> extends NamedDeclaration<Name> {
    data: ts.SignatureDeclarationBase;
    name: Name;
    typeParameters: TypeParameters;
    parameters: Parameters;
    type: Type;
}

// type SignatureDeclaration<
//     Name extends PropertyName<string> | undefined,
//     TypeParameters extends TypeParameterDeclaration<any, any, any, any>[] | undefined,
//     Parameters extends ParameterDeclaration<any, any, any, any, any, any>[] | undefined,
//     Type extends TypeNode<string> | undefined
// > = | CallSignatureDeclaration<TypeParameters, Parameters, Type>
//     | ConstructSignatureDeclaration<TypeParameters, Parameters, Type>
//     | MethodSignature<Name, TypeParameters, Parameters, Type>
//     | IndexSignatureDeclaration<TypeParameters, Parameters, Type>
//     | FunctionTypeNode<TypeParameters, Parameters, Type>
//     | ConstructorTypeNode<TypeParameters, Parameters, Type>
//     | FunctionDeclaration<Name, TypeParameters, Parameters, Type>
//     | MethodDeclaration<Name, TypeParameters, Parameters, Type>
//     | ConstructorDeclaration<TypeParameters, Parameters, Type>
//     | AccessorDeclaration<Name, TypeParameters, Parameters, Type>
//     | FunctionExpression<Name, TypeParameters, Parameters, Type>
//     | ArrowFunction<Name, TypeParameters, Parameters, Type>;

export interface CallSignatureDeclaration<
    TypeParameters extends TypeParameterDeclaration<any, any, any, any>[] | undefined,
    Parameters extends ParameterDeclaration<any, any, any, any, any, any>[] | undefined,
    Type extends TypeNode<string> | undefined
> extends SignatureDeclarationBase<PropertyName<string>, TypeParameters, Parameters, Type> {
    data: ts.CallSignatureDeclaration;
}

export interface ConstructSignatureDeclaration<
    TypeParameters extends TypeParameterDeclaration<any, any, any, any>[] | undefined,
    Parameters extends ParameterDeclaration<any, any, any, any, any, any>[] | undefined,
    Type extends TypeNode<string> | undefined
> extends SignatureDeclarationBase<PropertyName<string>, TypeParameters, Parameters, Type> {
    data: ts.ConstructSignatureDeclaration;
}

export type BindingName<Text extends string> = Identifier<Text> | BindingPattern;

export interface VariableDeclaration<
    Name extends BindingName<string>,
    Type extends TypeNode<string>| undefined = undefined,
    Initializer extends Node | undefined = undefined,
    ExclamationToken extends Token<"!"> | undefined = undefined,
    Text extends string = string,
> extends NamedDeclaration<Name> {
    data: ts.VariableDeclaration;
    exclamationToken?: ExclamationToken;
    type?: Type;
    initializer?: Initializer;
}

export interface VariableDeclarationList<
    Children extends Node[],
    Text extends string
> extends Node, HelperNode<Children, Text> {
    data: ts.VariableDeclarationList;
    readonly declarations: Children;
}

export interface ParameterDeclaration<
    Name extends BindingName<string>,
    DotDotDotToken extends Token<"..."> | undefined,
    QuestionToken extends Token<"?"> | undefined,
    Type extends TypeNode<string>| undefined,
    Initializer extends Node | undefined,
    Text extends string
> extends NamedDeclaration<Name> {
    data: ts.ParameterDeclaration;
    dotDotDotToken?: DotDotDotToken;
    questionToken?: QuestionToken;
    type?: Type;
    initializer?: Initializer;
}

export interface BindingElement<
    Name extends BindingName<string>,
    DotDotDotToken extends Token<"..."> | undefined,
    Initializer extends Node | undefined,
    PropertyName extends Node | undefined,
    Text extends string
> extends NamedDeclaration<Name> {
    data: ts.BindingElement;
    dotDotDotToken?: DotDotDotToken;
    initializer?: Initializer;
    propertyName?: PropertyName;
}

export interface PropertySignature<
    Name extends PropertyName<string>,
    QuestionToken extends Token<"?"> | undefined,
    Type extends TypeNode<string>| undefined,
    Initializer extends Node | undefined,
    Text extends string
> extends NamedDeclaration<Name> {
    data: ts.PropertySignature;
    questionToken?: QuestionToken;
    type?: Type;
    initializer?: Initializer;
}

export interface PropertyDeclaration<
    Name extends PropertyName<string>,
    ExclamationToken extends Token<"!"> | undefined,
    QuestionToken extends Token<"?"> | undefined,
    Type extends TypeNode<string> | undefined,
    Initializer extends Node | undefined,
    Text extends string
> extends NamedDeclaration<Name> {
    data: ts.PropertyDeclaration;
    exclamationToken?: ExclamationToken;
    questionToken?: QuestionToken;
    type?: Type;
    initializer?: Initializer;
}

export interface ObjectLiteralElement<
    Name extends PropertyName<string>,
> extends NamedDeclaration<Name> {
    data: ts.ObjectLiteralElement;
    name: Name;
}

export type ObjectLiteralElementLike =
    | PropertyAssignment<any, any, any, any, any>
    | ShorthandPropertyAssignment<any, any, any, any, any, any>
    | SpreadAssignment<any, any>
    // | MethodDeclaration<any, any, any, any, any, any, any, any ,any>
    // | AccessorDeclaration;

export interface PropertyAssignment<
    Name extends PropertyName<string>,
    Initializer extends Node,
    QuestionToken extends Token<"?"> | undefined,
    ExclamationToken extends Token<"!"> | undefined,
    Text extends string
> extends ObjectLiteralElement<Name> {
    data: ts.PropertyAssignment;
    initializer: Initializer;
    questionToken?: QuestionToken;
    exclamationToken?: ExclamationToken;
}

export interface ShorthandPropertyAssignment<
    Name extends Identifier<string>,
    QuestionToken extends Token<"?"> | undefined,
    ExclamationToken extends Token<"!"> | undefined,
    EqualsToken extends Token<"="> | undefined,
    ObjectAssignmentInitializer extends Node | undefined,
    Text extends string
> extends ObjectLiteralElement<Name> {
    data: ts.ShorthandPropertyAssignment;
    questionToken?: QuestionToken;
    exclamationToken?: ExclamationToken;
    equalsToken?: EqualsToken;
    objectAssignmentInitializer?: ObjectAssignmentInitializer;
}

export interface SpreadAssignment<
    Expression extends Node,
    Text extends string
> extends ObjectLiteralElement<PropertyName<Text>> {
    data: ts.SpreadAssignment;
    expression: Expression;
}

export type VariableLikeDeclaration =
    | VariableDeclaration<any, any, any, any, any>
    | ParameterDeclaration<any, any, any, any, any, any>
    | BindingElement<any, any, any, any, any>
    | PropertyDeclaration<any, any, any, any, any, any>
    | PropertyAssignment<any, any, any, any, any>
    | PropertySignature<any, any, any, any, any>
    | ShorthandPropertyAssignment<any, any, any, any, any, any>
    // | EnumMember<any, any, any, any, any, any>;

export interface PropertyLikeDeclaration<
    Name extends PropertyName<string>,
    Text extends string
> extends NamedDeclaration<Name> {
    data: ts.PropertyLikeDeclaration;
    name: Name;
}

export interface ObjectBindingPattern<
    Elements extends BindingElement<any, any, any, any, any>[],
    Text extends string
> extends Node, HelperNode<Elements, Text> {
    data: ts.ObjectBindingPattern;
    readonly elements: Elements;
}

export interface ArrayBindingPattern<
    Elements extends (BindingElement<any, any, any, any, any> | OmittedExpression<any, any>)[],
    Text extends string
> extends Node, HelperNode<Elements, Text> {
    data: ts.ArrayBindingPattern;
    readonly elements: Elements;
}

export type BindingPattern = ObjectBindingPattern<any, any> | ArrayBindingPattern<any, any>;

export interface TypeNode<Text extends string> extends Node, HelperNode<never, Text> {
    data: ts.TypeNode;
}

export type KeywordTypeSyntaxKindTextMap = {
    "any": ts.SyntaxKind.AnyKeyword;
    "bigint": ts.SyntaxKind.BigIntKeyword;
    "boolean": ts.SyntaxKind.BooleanKeyword;
    "intrinsic": ts.SyntaxKind.IntrinsicKeyword;
    "never": ts.SyntaxKind.NeverKeyword;
    "number": ts.SyntaxKind.NumberKeyword;
    "object": ts.SyntaxKind.ObjectKeyword;
    "string": ts.SyntaxKind.StringKeyword;
    "symbol": ts.SyntaxKind.SymbolKeyword;
    "undefined": ts.SyntaxKind.UndefinedKeyword;
    "unknown": ts.SyntaxKind.UnknownKeyword;
    "void": ts.SyntaxKind.VoidKeyword;
}

export interface KeywordTypeNode<KindText extends keyof KeywordTypeSyntaxKindTextMap> extends TypeNode<KindText> {
    data: ts.KeywordTypeNode<KeywordTypeSyntaxKindTextMap[KindText]>;
}

export interface StringLiteral<
    Text extends string
> extends LiteralExpression<[], Text>, Declaration<Text> {
    data: ts.StringLiteral;
}

export type StringLiteralLike<Text extends string> = StringLiteral<Text>;

export interface Expression<
    Children extends Node[],
    Text extends string
> extends Node, HelperNode<Children, Text> {
    data: ts.Expression;
}

export interface OmittedExpression<
    Children extends Node[],
    Text extends string
> extends Expression<Children, Text> {
    data: ts.OmittedExpression;
}

export interface UnaryExpression<
    Children extends Node[],
    Text extends string
> extends Expression<Children, Text> {
    data: ts.UnaryExpression;
}

export interface UpdateExpression<
    Children extends Node[],
    Text extends string
> extends UnaryExpression<Children, Text> {
    data: ts.UpdateExpression;
}

export interface PrefixUnaryExpression<
    Children extends Node[],
    Text extends string
> extends UpdateExpression<Children, Text> {
    data: ts.PrefixUnaryExpression;
}

export interface PostfixUnaryExpression<
    Children extends Node[],
    Text extends string
> extends UpdateExpression<Children, Text> {
    data: ts.PostfixUnaryExpression;
}

export interface LeftHandSideExpression<
    Children extends Node[],
    Text extends string
> extends UpdateExpression<Children, Text> {
    data: ts.LeftHandSideExpression;
}

export interface MemberExpression<
    Children extends Node[],
    Text extends string
> extends LeftHandSideExpression<Children, Text> {
    data: ts.MemberExpression;
}

export interface PrimaryExpression<
    Children extends Node[],
    Text extends string
> extends MemberExpression<Children, Text> {
    data: ts.PrimaryExpression;
}

export interface NullLiteral<
    Children extends Node[],
    Text extends string
> extends PrimaryExpression<Children, Text> {
    data: ts.NullLiteral;
}

export interface TrueLiteral<
    Children extends Node[],
    Text extends string
> extends PrimaryExpression<Children, Text> {
    data: ts.TrueLiteral;
}

export interface FalseLiteral<
    Children extends Node[],
    Text extends string
> extends PrimaryExpression<Children, Text> {
    data: ts.FalseLiteral;
}

export type BooleanLiteral = TrueLiteral<[], string> | FalseLiteral<[], string>;

export interface ThisExpression<
    Children extends Node[],
    Text extends string
> extends PrimaryExpression<Children, Text> {
    data: ts.ThisExpression;
}

export interface SuperExpression<
    Children extends Node[],
    Text extends string
> extends PrimaryExpression<Children, Text> {
    data: ts.SuperExpression;
}

export interface ImportExpression<
    Children extends Node[],
    Text extends string
> extends PrimaryExpression<Children, Text> {
    data: ts.ImportExpression;
}

export interface DeleteExpression<
    Children extends Node[],
    Text extends string
> extends UnaryExpression<Children, Text> {
    data: ts.DeleteExpression;
}

export interface TypeOfExpression<
    Children extends Node[],
    Text extends string
> extends UnaryExpression<Children, Text> {
    data: ts.TypeOfExpression;
}

export interface LiteralLikeNode<
    Children extends Node[],
    Text extends string
> extends Node {
    data: ts.LiteralLikeNode;
}

export interface LiteralExpression<
    Children extends Node[],
    Text extends string
> extends PrimaryExpression<Children, Text>, LiteralLikeNode<Children, Text> {
    data: ts.LiteralExpression;
}

export interface NumericLiteral<
    Children extends Node[],
    Text extends string
> extends LiteralExpression<Children, Text>, Declaration<Text, Children>, HelperNode<Children, Text> {
    data: ts.NumericLiteral;
}

export interface Statement extends Node {
    data: ts.Statement;
}

export interface EmptyStatement extends Statement, HelperNode<never, ""> {
    data: ts.EmptyStatement;
}

export interface DebuggerStatement extends Statement, HelperNode<never, "debugger;"> {
    data: ts.DebuggerStatement;
}

export interface MissingDeclaration<
    Expr extends Expression<any, any>,
    Text extends string
> extends DeclarationStatement<DeclarationName<Text>> {
    data: ts.MissingDeclaration;
    readonly expression: Expr;
    readonly name: Identifier<Text> | undefined;
}

export interface Block<
    Statements extends Statement[],
    Text extends string
> extends Statement, HelperNode<Statements, Text> {
    data: ts.Block;
    statements: Statements;
}

export interface VariableStatement<
    DeclarationList extends VariableDeclarationList<any, any>,
    Text extends string
> extends Statement, HelperNode<[DeclarationList], Text> {
    data: ts.VariableStatement;
    declarationList: DeclarationList;
}

export interface ExpressionStatement<
    Expr extends Expression<any, any>,
    Text extends string
> extends Statement, HelperNode<[Expr], Text> {
    data: ts.ExpressionStatement;
    expression: Expr;
}

export interface IfStatement<
    ThenStatement extends Statement,
    ElseStatement extends Statement | undefined,
    Text extends string
> extends Statement, HelperNode<
    ElseStatement extends undefined ? [ThenStatement] : [ThenStatement, ElseStatement], 
    Text
> {
    data: ts.IfStatement;
    thenStatement: ThenStatement;
    elseStatement: ElseStatement;
}

export interface IterationStatement<
    Stmt extends Statement,
    Text extends string
> extends Statement, HelperNode<[Stmt], Text> {
    data: ts.IterationStatement;
    statement: Stmt;
}

export interface DoStatement<
    Expr extends Expression<any, any>,
    Stmt extends Statement,
    Text extends string
> extends IterationStatement<Stmt, Text> {
    data: ts.DoStatement;
    expression: Expr;
}

export interface WhileStatement<
    Expr extends Expression<any, any>,
    Stmt extends Statement,
    Text extends string
> extends IterationStatement<Stmt, Text> {
    data: ts.WhileStatement;
    expression: Expr;
}

export type ForInitializer<Children extends Node[], Text extends string> = 
    VariableDeclarationList<Children, Text> | Expression<Children, Text>;

export interface ForStatement<
    Initializer extends ForInitializer<any, any> | undefined,
    Condition extends Expression<any, any> | undefined,
    Incrementor extends Expression<any, any> | undefined,
    Stmt extends Statement,
    Text extends string
> extends IterationStatement<Stmt, Text> {
    data: ts.ForStatement;
    initializer: Initializer;
    condition: Condition;
    incrementor: Incrementor;
}

export interface ForInStatement<
    Initializer extends ForInitializer<any, any>,
    Expr extends Expression<any, any>,
    Stmt extends Statement,
    Text extends string
> extends IterationStatement<Stmt, Text> {
    data: ts.ForInStatement;
    initializer: Initializer;
    expression: Expr;
}

export interface ForOfStatement<
    Initializer extends ForInitializer<any, any>,
    Expr extends Expression<any, any>,
    Stmt extends Statement,
    Text extends string
> extends IterationStatement<Stmt, Text> {
    data: ts.ForOfStatement;
    initializer: Initializer;
    expression: Expr;
}

export interface BreakStatement<
    Label extends Identifier<any> | undefined,
    Text extends string
> extends Statement, HelperNode<Label extends undefined ? [] : [Label], Text> {
    data: ts.BreakStatement;
    label: Label;
}

export interface ContinueStatement<
    Label extends Identifier<any> | undefined,
    Text extends string
> extends Statement, HelperNode<Label extends undefined ? [] : [Label], Text> {
    data: ts.ContinueStatement;
    label: Label;
}

export type BreakOrContinueStatement<Label extends Identifier<any> | undefined, Text extends string> =
    BreakStatement<Label, Text> | ContinueStatement<Label, Text>;

export interface ReturnStatement<
    Expr extends Expression<any, any> | undefined,
    Text extends string
> extends Statement, HelperNode<Expr extends undefined ? [] : [Expr], Text> {
    data: ts.ReturnStatement;
    expression: Expr;
}

export interface WithStatement<
    Expr extends Expression<any, any>,
    Stmt extends Statement,
    Text extends string
> extends Statement, HelperNode<[Expr, Stmt], Text> {
    data: ts.WithStatement;
    expression: Expr;
    statement: Stmt;
}

export interface SwitchStatement<
    Expr extends Expression<any, any>,
    Block extends CaseBlock<any, any>,
    Text extends string
> extends Statement, HelperNode<[Expr, Block], Text> {
    data: ts.SwitchStatement;
    expression: Expr;
    caseBlock: Block;
}

export interface CaseBlock<
    Clauses extends (CaseOrDefaultClause<any, any, any>)[],
    Text extends string
> extends Node, HelperNode<Clauses, Text> {
    data: ts.CaseBlock;
    clauses: Clauses;
}

export interface CaseClause<
    Expr extends Expression<any, any>,
    Statements extends Statement[],
    Text extends string
> extends Node, HelperNode<[Expr, ...Statements], Text> {
    data: ts.CaseClause;
    expression: Expr;
    statements: Statements;
}

export interface DefaultClause<
    Statements extends Statement[],
    Text extends string
> extends Node, HelperNode<Statements, Text> {
    data: ts.DefaultClause;
    statements: Statements;
}

export type CaseOrDefaultClause<Condition extends Expression<any, any>, Statements extends Statement[], Text extends string> =
    CaseClause<Condition, Statements, Text> | DefaultClause<Statements, Text>;

export interface LabeledStatement<
    Label extends Identifier<any>,
    Stmt extends Statement,
    Text extends string
> extends Statement, HelperNode<[Label, Stmt], Text> {
    data: ts.LabeledStatement;
    label: Label;
    statement: Stmt;
}

export interface ThrowStatement<
    Expr extends Expression<any, any>,
    Text extends string
> extends Statement, HelperNode<[Expr], Text> {
    data: ts.ThrowStatement;
    expression: Expr;
}

export interface TryStatement<
    TryBlock extends Block<any, any>,
    Catch extends CatchClause<any, any, any> | undefined,
    Finally extends Block<any, any> | undefined,
    Text extends string
> extends Statement, HelperNode<
    Catch extends undefined ?
        (Finally extends undefined ? [TryBlock] : [TryBlock, Finally]) :
        (Finally extends undefined ? [TryBlock, Catch] : [TryBlock, Catch, Finally]),
    Text
> {
    data: ts.TryStatement;
    tryBlock: TryBlock;
    catchClause: Catch;
    finallyBlock: Finally;
}

export interface CatchClause<
    Variable extends VariableDeclaration<any, any> | undefined,
    CatchBlock extends Block<any, any>,
    Text extends string
> extends Node, HelperNode<Variable extends undefined ? [CatchBlock] : [Variable, CatchBlock], Text> {
    data: ts.CatchClause;
    variableDeclaration: Variable;
    block: CatchBlock;
}